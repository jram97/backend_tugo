import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { schema } from './model'
import { index } from './controller'
import { saveCategory,destroy,updateCategories } from './controller'
export userCategories, { schema } from './model'

const router = new Router()
const { user, categories } = schema.tree

/**
 * @api {post} /user_categories Create a category for the user
 * @apiName CreateUserCategory
 * @apiGroup User_Categories
 * @apiPermission user,admin
 * @apiParam {String} access_token user access token.
 * @apiParam {String} categories CategoryID
 * @apiSuccess {Object} category Category Created
 */
router.post('/',
  token({ required: true, roles: ['user', 'admin'] }),
  body({ categories }),
  saveCategory)

/**
 * @api {get} /user_categories?user={userID} Get a category for an user
 * @apiName ShowUserCategories
 * @apiGroup User_Categories
 * @apiPermission user,admin
 * @apiParam {String} access_token user access token.
 * @apiParam {String} user userID as query param
 * @apiSuccess {Object} categories user's categories
 * @apiSuccess {Number} count Total of data
 * @apiSuccess {Object[]} rows List of user's categories
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  token({ required: true, roles: ['user', 'admin'] }),
  query({
    user: { paths: ['user'] }
  }, {
    user: true
  }),
  index)

/**
 * @api {put} /user_categories/:user_id Update user's categories
 * @apiName UpdateUserCategories
 * @apiGroup User_Categories
 * @apiPermission user,admin
 * @apiParam {String} access_token user access token.
 * @apiParam {String} user user_id as  param to search
 * @apiParam {String} categories ids of categories to add
 * @apiSuccess {Object} categories user's categories
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.put('/:user_id',
  token({ required: true, roles: ['user', 'admin'] }),
  body({ categories }),
  updateCategories)

/**
 * @api {delete} /user_categories/:id delete a category for an user
 * @apiName DeleteUserCategories
 * @apiGroup User_Categories
 * @apiPermission user,admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Sucess 204) 204 No Content
 * @apiError 404 user_category not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['user', 'admin'] }),
  destroy)

export default router
