import { Router } from 'express'
import { authenticate, restrictTo } from '../middlewares/auth.js'
import * as event from '../controllers/event.js'

const router = Router()

router.get('/', event.findMany)
router.post('/', authenticate, restrictTo('organizer'), event.create)

router.get('/:id', event.findById)
router.put('/:id', authenticate, restrictTo('organizer'), event.update)
router.delete('/:id', authenticate, restrictTo('organizer'), event.remove)

router.post(
  '/:eventId/register',
  authenticate,
  restrictTo('user'),
  event.register
)

export default router
