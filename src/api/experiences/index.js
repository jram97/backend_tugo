import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Experiences, { schema } from './model'


const router = new Router()
const { name, description, direction, price, lat, long, quotas, start, end, duration, extra, enabled } = schema.tree

/**
 * @api {post} /experiences Create experiences
 * @apiName CreateExperiences
 * @apiGroup Experiences
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam {String} name Experiences's name.
 * @apiParam {String} description Experiences's description.
 * @apiParam {String} direction Experiences's direction.
 * @apiParam {String} price Experiences's price.
 * @apiParam {String} lat Experiences's latitud.
 * @apiParam {String} long Experiences's longitud.
 * @apiParam {String} quotas Experiences's quotas.
 * @apiParam {String} start Experiences's start.
 * @apiParam {String} end Experiences's end.
 * @apiParam {String} duration Experiences's duration.
 * @apiParam {Array} extra Experiences's extra.
 * @apiParam {Boolean} [enabled] Experiences's enabled.
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 * @apiError 401 user access only.
 */
router.post('/',
  token({ required: true, roles: ['user'] }),
  body({ name, description, direction, price, lat, long, quotas, start, end, duration, extra, enabled }),
  create)

/**
 * @api {post} /experiences/admin Create experiences
 * @apiName CreateExperiences
 * @apiGroup Experiences
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} name Experiences's name.
 * @apiParam {String} description Experiences's description.
 * @apiParam {String} direction Experiences's direction.
 * @apiParam {String} price Experiences's price.
 * @apiParam {String} lat Experiences's latitud.
 * @apiParam {String} long Experiences's longitud.
 * @apiParam {String} quotas Experiences's quotas.
 * @apiParam {String} start Experiences's start.
 * @apiParam {String} end Experiences's end.
 * @apiParam {String} duration Experiences's duration.
 * @apiParam {Array} extra Experiences's extra.
 * @apiParam {Boolean} [enabled] Experiences's enabled.
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 * @apiError 401 admin access only.
 */
router.post('/admin',
  token({ required: true, roles: ['admin'] }),
  body({ name, description, direction, price, lat, long, quotas, start, end, duration, extra, enabled }),
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
    direction: { paths: ['direction'], operator: '$regex' },
    rating: { type: Number, paths: ['rating'] }
  }, {
    user: true,
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
 * @apiParam {String} price Experiences's price.
 * @apiParam {String} lat Experiences's latitud.
 * @apiParam {String} long Experiences's longitud.
 * @apiParam {String} quotas Experiences's quotas.
 * @apiParam {String} start Experiences's start.
 * @apiParam {String} end Experiences's end.
 * @apiParam {String} duration Experiences's duration.
 * @apiParam {Array} extra Experiences's extra.
 * @apiParam {Boolean} [enabled] Experiences's enabled.
 * @apiSuccess {Object} experiences Experiences's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Experiences not found.
 * @apiError 401 user access only.
 */
router.put('/:id',
  token({ required: true }),
  body({ name, description, direction, price, lat, long, quotas, start, end, duration, extra, enabled }),
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
