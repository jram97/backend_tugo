import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Review, { schema } from './model'

const router = new Router()
const { experiences, title, description, star } = schema.tree

/**
 * @api {post} /reviews Create review
 * @apiName CreateReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} experiences Review's experiencesId.
 * @apiParam {String} title Review's title.
 * @apiParam {String} description Review's description.
 * @apiParam {String} star Review's star.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ experiences, title, description, star }),
  create)

/**
 * @api {get} /reviews Retrieve reviews
 * @apiName RetrieveReviews
 * @apiGroup Review
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of reviews.
 * @apiSuccess {Object[]} rows List of reviews.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /reviews/:id Retrieve review
 * @apiName RetrieveReview
 * @apiGroup Review
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /reviews/:id Update review
 * @apiName UpdateReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {ObjectId} experiences Review's experiencesId.
 * @apiParam {String} title Review's title.
 * @apiParam {String} description Review's description.
 * @apiParam {String} star Review's star.
 * @apiSuccess {Object} review Review's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ experiences, title, description, star }),
  update)

/**
 * @api {delete} /reviews/:id Delete review
 * @apiName DeleteReview
 * @apiGroup Review
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Review not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
