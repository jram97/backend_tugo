import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Messages, { schema } from './model'

const router = new Router()
const { user_by, text, read } = schema.tree

/**
 * @api {post} /messages Create messages
 * @apiName CreateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam user_by Messages's user_by.
 * @apiParam text Messages's text.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ user_by, text }),
  create)

/**
 * @api {get} /messages Retrieve messages
 * @apiName RetrieveMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} [by] user_by'Id.
 * @apiParam {ObjectId} [from] user_from'Id.
 * @apiParam {Boolean} [read] read message.
 * @apiSuccess {Number} count Total amount of messages.
 * @apiSuccess {Object[]} rows List of messages.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
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
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} messages Messages's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /messages/:id Update payments
 * @apiName UpdateMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {Boolean} read Message's read.
 * @apiSuccess {Object} messages Message's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ read }),
  update)


/**
 * @api {delete} /messages/:id Delete messages
 * @apiName DeleteMessages
 * @apiGroup Messages
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Messages not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
