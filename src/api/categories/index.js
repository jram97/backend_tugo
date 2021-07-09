import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from './model'
import { create, index, destroy, show,update } from './controller'
export categories, { schema } from './model'

const router = new Router()
const { icon, name } = schema.tree

/**
 * @api {post} /categories Create category or gusto
 * @apiName CreateCategories
 * @apiGroup Categories
 * @apiPermission admin,user
 * @apiParam {String} name Category name
 * @apiParam {String} icon icon name
 * @apiSuccess {Object} category Category's data
 */
router.post('/',
  token({ required: true, roles: ['admin', 'user'] }),
  body({ icon, name }),
  create)

/**
 * @api {get} /categories Retrive all categories
 * @apiName RetriveCategories
 * @apiGroup Categories
 * @apiPermission admin,user, owner
 * @apiSuccess {Number} count Total amount of categories.
 * @apiSuccess {Object[]} rows List of categories.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['admin', 'user', 'owner'] }),
  query(),
  index)

/**
 * @api {get} /categories/:id Retrive a category
 * @apiName RetriveCategory
 * @apiGroup Categories
 * @apiPermission admin,user, owner
 * @apiSuccess {Object} category Category Object
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Category not found.
 */
router.get('/:id',
  token({ required: true, roles: ['admin', 'user', 'owner'] }),
  show)

router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({
    icon,
    name
  }),
  update)

/**
 * @api {delete} /categories/:id Remove Category
 * @apiName DeleteCategory
 * @apiGroup Categories
 * @apiPermission admin
 * @apiSuccess (Sucess 204) 204 No Content
 * @apiError 404 Category not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

export default router
