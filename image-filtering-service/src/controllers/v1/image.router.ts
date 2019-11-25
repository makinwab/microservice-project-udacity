import { Router, Request, Response } from 'express';
import { requireAuth } from './auth.router';

const router: Router = Router();

router.post('/imagetoprocess', requireAuth, (req: Request, res: Response) => {

});

export const ImageRouter: Router = router;