import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  const startTime = Date.now();
  const uptime_mills = (Date.now() - startTime),
    uptime_secs = (uptime_mills / 1000),
    uptime_mins = Math.round((uptime_secs / 60)),
    uptime_hrs = Math.round((uptime_mins / 60));

  res.json({
    uptime_mills: uptime_mills,
    uptime_secs: uptime_secs,
    uptime_mins: uptime_mins,
    uptime_hrs: uptime_hrs
  });
});

export const HealthCheckController: Router = router;
