import { Router } from 'express';
import notFound from './404';
const router = Router();
// Add your router here

// not founded router
router.use(notFound);

export default router;
