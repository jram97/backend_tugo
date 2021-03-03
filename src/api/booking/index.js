import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Booking, { schema } from './model'

const router = new Router()
const { experiences, date, places, enabled } = schema.tree

/**
 * @api {post} /bookings Create booking
 * @apiName CreateBooking
 * @apiGroup Booking
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} experiences Booking's experiences.
 * @apiParam {String} date Booking's date.
 * @apiParam {String} places Booking's places.
 * @apiParam {Boolean} enabled Booking's enabled.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ experiences, date, places }),
  create)

/**
 * @api {get} /bookings Retrieve bookings
 * @apiName RetrieveBookings
 * @apiGroup Booking
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of bookings.
 * @apiSuccess {Object[]} rows List of bookings.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 user access only.
 */
router.get('/',
  token({ required: true }),
  query(),
  index)

/**
 * @api {get} /bookings/:id Retrieve booking
 * @apiName RetrieveBooking
 * @apiGroup Booking
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 user access only.
 */
router.get('/:id',
  token({ required: true }),
  show)

/**
 * @api {put} /bookings/:id Update booking
 * @apiName UpdateBooking
 * @apiGroup Booking
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} experiences Booking's experiences.
 * @apiParam {String} date Booking's date.
 * @apiParam {String} places Booking's places.
 * @apiParam {Boolean} enabled Booking's enabled.
 * @apiSuccess {Object} booking Booking's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Booking not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ experiences, date, places, enabled }),
  update)

/**
 * @api {delete} /bookings/:id Delete booking
 * @apiName DeleteBooking
 * @apiGroup Booking
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Booking not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
