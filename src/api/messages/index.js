import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, loadChat, index, show, update, destroy } from './controller'
import { schema } from './model'
export Messages, { schema } from './model'

const router = new Router()
const { user_by, text, read } = schema.tree

/**
 * @api {post} /messages Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} user_by Messages's user_by.
 * @apiParam {String} text Messages's text.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  body({ user_by, text }),
  create)

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user, owner
 * @apiUse listParams
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} [by] user_by'Id to Search.
 * @apiParam {ObjectId} [from] user_from'Id to Search.
 * @apiParam {Boolean} [read] read message to Search.
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['owner', 'user'] }),
  query({
    by: { paths: ['user_by'] },
    from: { paths: ['user_from'] },
    read: { paths: ['read'], type: Boolean },
  }, {
    by: true,
    from: true,
    read: true
  }),
  index)

/**
 * @api {get} /messages/:id Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  show)

/**
 * @api {put} /messages/:id Update payments
 * @apiName UpdateMessages
 * @apiGroup Messages
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiParam {Boolean} read Message's read.
 * @apiSuccess {Object} messages Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  body({ read }),
  update)

router.get('/loadChat/:by',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  loadChat)
/**
 * @api {delete} /messages/:id Delete messages
 * @apiName DeleteMessages
 * @apiGroup Messages
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  destroy)

export default router
