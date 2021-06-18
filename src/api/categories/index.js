import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from './model'
import { create, index, destroy, show } from './controller'
export categories, { schema } from './model'

const router = new Router()
const { name } = schema.tree

router.post('/',
  body({ name }),
  create)

router.get('/',
  query(),
  index)

router.get('/:id',
  show)

router.delete('/:id',
  destroy)


export default router
