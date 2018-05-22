Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(webLinks);
Terminal.applyAddon(winptyCompat);

var term,
  protocol,
  socketURL,
  socket,
  pid;

document.addEventListener('DOMContentLoaded', function() {
  createTerminal();
});

function createTerminal() {
  term = new Terminal({
    cursorBlink: true
  });
  window.term = term;

  protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
  socketURL = protocol + location.hostname + ((location.port) ? (':' + location.port) : '') + '/terminal' + '/terminals/';

  term.open(document.getElementById('#terminal'));
  term.winptyCompatInit();
  term.webLinksInit();
  term.element.style.paddingBottom = '50px';//Fix the nav bar causing a bottom spacing
  term.fit();
  term.focus();

  setTimeout(function() {
    fetch('/terminal/terminals', {
      method: 'POST'
    }).then(function(res) {

      res.text().then(function(processId) {
        pid = processId;
        socketURL += processId;
        socket = new WebSocket(socketURL);
        socket.onopen = runRealTerminal;
        socket.onclose = runFakeTerminal;
        socket.onerror = runFakeTerminal;
      });
    });
  }, 0);
}

function runRealTerminal() {
  console.log('RealtimeTerminal started');

  term.attach(socket);
  term._initialized = true;
}

function runFakeTerminal() {
  console.log('FakeTerminal started');
  if (term._initialized) {
    return;
  }

  term._initialized = true;

  var shellprompt = '$ ';

  term.prompt = function() {
    term.write('\r\n' + shellprompt);
  };

  term.write('Hello from \033[1;3;31mxterm.js\033[0m $ ');
  term.writeln('');
  term.prompt();

  term.on('key', function(key, ev) {
    var printable = (!ev.altKey && !ev.altGraphKey && !ev.ctrlKey && !ev.metaKey);

    if (ev.keyCode == 13) {
      term.prompt();
    } else if (ev.keyCode == 8) {
      // Do not delete the prompt
      if (term.x > 2) {
        term.write('\b \b');
      }
    } else if (printable) {
      term.write(key);
    }
  });

  term.on('paste', function(data, ev) {
    term.write(data);
  });
}
