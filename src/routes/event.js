import { Router } from 'express'
import { authenticate } from '../middlewares/auth.js'
import * as event from '../controllers/event.js'

const router = Router()

router.get('/', event.findMany)
router.post('/', authenticate, event.create)

router.get('/:id', event.findById)
router.put('/:id', authenticate, event.update)
router.delete('/:id', authenticate, event.remove)

export default router
