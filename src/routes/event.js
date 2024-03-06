import { Router } from 'express'
import * as event from '../controllers/event.js'

const router = Router()

router.get('/', event.findMany)
router.post('/', event.create)

router.get('/:id', event.findById)
router.put('/:id', event.update)
router.delete('/:id', event.remove)

export default router
