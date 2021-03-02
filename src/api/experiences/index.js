import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, indexRating, show, update, destroy } from './controller'
import { schema } from './model'
export Experiences, { schema } from './model'


const router = new Router()
const { name, description, direction, enabled } = schema.tree

/**
 * @api {post} /experiences Create experiences
 * @apiName CreateExperiences
 * @apiGroup Experiences
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} name Experiences's name.
 * @apiParam {String} description Experiences's description.
 * @apiParam {String} direction Experiences's direction.
 * @apiParam {Boolean} enabled Experiences's enabled.
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true }),
  body({ name, description, direction, enabled }),
  create)

/**
 * @api {get} /experiences Retrieve experiences
 * @apiName RetrieveExperiences
 * @apiGroup Experiences
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of experiences.
 * @apiSuccess {Object[]} rows List of experiences.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    user: { paths: ['user'] },
    name: { paths: ['name'], operator: '$regex' },
    direction: { paths: ['direction'], operator: '$regex' },
    rating: { type: Number, paths: ['rating'] }
  }, {
    user: true,
    name: true,
    rating: true,
    direction: true
  }),
  index)

/**
 * @api {get} /experiences/:id Retrieve experiences
 * @apiName RetrieveExperiences
 * @apiGroup Experiences
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /experiences/:id Update experiences
 * @apiName UpdateExperiences
 * @apiGroup Experiences
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} name Experiences's name.
 * @apiParam {String} description Experiences's description.
 * @apiParam {String} direction Experiences's direction.
 * @apiParam {Boolean} enabled Experiences's enabled.
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, enabled }),
  update)

/**
 * @api {delete} /experiences/:id Delete experiences
 * @apiName DeleteExperiences
 * @apiGroup Experiences
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Experiences not found.
 * @apiError 401 user access only.
 */
router.delete('/:id',
  token({ required: true }),
  destroy)

export default router
