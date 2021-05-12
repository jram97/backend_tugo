import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Card, { schema } from './model'

const router = new Router()
const { type, card, date, cvv, name, ip } = schema.tree

/**
 * @api {post} /cards Create Card
 * @apiName CreateCard
 * @apiGroup Card
 * @apiPermission user, owner
 * @apiParam {String} access_token user access token.
 * @apiParam {String} type Card's type.
 * @apiParam {String} card Card's card.
 * @apiParam {String} date Card's date.
 * @apiParam {String} cvv Card's cvv.
 * @apiParam {String} name Card's name.
 * @apiParam {String} ip Card's ip.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true, roles: ['owner', 'user'] }),
  body({ type, card, date, cvv, name, ip }),
  create)

/**
 * @api {get} /cards Retrieve Cards
 * @apiName RetrieveCards
 * @apiGroup Card
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of Card.
 * @apiSuccess {Object[]} rows List of Card.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  query(),
  index)

/**
 * @api {get} /cards/:id Retrieve Card
 * @apiName RetrieveCard
 * @apiGroup Card
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  show)

/**
 * @api {put} /cards/:id Update Card
 * @apiName UpdateCard
 * @apiGroup Card
 * @apiPermission user, owner
 * @apiParam {String} access_token user access token.
 * @apiParam {String} type Card's type.
 * @apiParam {String} card Card's card.
 * @apiParam {String} date Card's date.
 * @apiParam {String} cvv Card's cvv.
 * @apiParam {String} name Card's name.
 * @apiParam {String} ip Card's ip.
 * @apiSuccess {Object} card Card's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Card not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true, roles: ['owner', 'user'] }),
  body({ type, card, date, cvv, name, ip }),
  update)

/**
 * @api {delete} /cards/:id Delete Card
 * @apiName DeleteCard
 * @apiGroup Card
 * @apiPermission user, owner, admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Card not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  destroy)

export default router
