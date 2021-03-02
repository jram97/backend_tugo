import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Payments, { schema } from './model'

const router = new Router()
const { booking, card, mount } = schema.tree

/**
 * @api {post} /payments Create payments
 * @apiName CreatePayments
 * @apiGroup Payments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} booking Payments's booking.
 * @apiParam {ObjectId} card Payments's card.
 * @apiParam {String} mount Payments's mount.
 * @apiSuccess {Object} payments Payments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payments not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ booking, card }),
  create)

/**
 * @api {get} /payments Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of payments.
 * @apiSuccess {Object[]} rows List of payments.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /payments/:id Retrieve payments
 * @apiName RetrievePayments
 * @apiGroup Payments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} payments Payments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payments not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /payments/:id Update payments
 * @apiName UpdatePayments
 * @apiGroup Payments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} booking Payments's booking.
 * @apiParam {ObjectId} card Payments's card.
 * @apiParam {String} mount Payments's mount.
 * @apiSuccess {Object} payments Payments's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Payments not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ booking, card, mount }),
  update)

/**
 * @api {delete} /payments/:id Delete payments
 * @apiName DeletePayments
 * @apiGroup Payments
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Payments not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
