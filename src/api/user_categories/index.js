import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from './model'
import { index } from './controller'
import { saveCategory,destroy } from './controller'
export userCategories, { schema } from './model'

const router = new Router()
const { user, categories } = schema.tree

router.post('/',
  token({ required: true, roles: ['owner', 'admin'] }),
  body({ categories }),
  saveCategory)

router.get('/',
  query({
    user: { paths: ['user'] }
  }, {
    user: true
  }),
  index)

router.delete('/:id',
  token({ required: true, roles: ['owner', 'user'] }),
  destroy)

export default router
