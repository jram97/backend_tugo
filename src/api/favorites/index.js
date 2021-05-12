import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, destroy } from './controller'
import { schema } from './model'
export Favorites, { schema } from './model'


const router = new Router()
const { experiences } = schema.tree

/**
 * @api {post} /favorites Create favorites
 * @apiName CreateFavorites
 * @apiGroup Favorites
 * @apiPermission user, owner
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} experiences Favorites's experiencesId.
 * @apiSuccess {Object} favorites Favorites's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Favorites not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true, roles: ['owner', 'user'] }),
  body({ experiences }),
  create)

/**
 * @api {get} /favorites Retrieve favorites
 * @apiName RetrieveFavorites
 * @apiGroup Favorites
 * @apiPermission user, owner
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of favorites.
 * @apiSuccess {Object[]} rows List of favorites.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['owner', 'user'] }),
  query({
    user: { paths: ['user'] }
  }, {
    user: true
  }),
  index)

/**
 * @api {delete} /favorites/:id Delete favorites
 * @apiName DeleteFavorites
 * @apiGroup Favorites
 * @apiPermission user, owner
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Favorites not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['owner', 'user'] }),
  destroy)

export default router
