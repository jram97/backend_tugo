import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Schedule, { schema } from './model'

const router = new Router()
const { day, start, experience, date } = schema.tree

/**
 * @api {post} /schedules Create schedule
 * @apiName CreateSchedule
 * @apiGroup Schedule
 * @apiPermission owner
 * @apiParam {String} access_token owner access token.
 * @apiParam {String} day Schedule's day.
 * @apiParam {String} start Schedule's start.
 * @apiParam {ObjectId} experience Schedule's experience.
 * @apiParam {date} date Schedule's date.
 * @apiSuccess {Object} schedule Schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 owner access only.
 */
router.post('/',
  token({ required: true, roles: ['owner'] }),
  body({ day, start, experience, date }),
  create)

/**
 * @api {get} /schedules Retrieve schedules
 * @apiName RetrieveSchedules
 * @apiGroup Schedule
 * @apiUse listParams
 * @apiParam {String} [experience] Experience'Id to Search.
 * @apiSuccess {Number} count Total amount of schedules.
 * @apiSuccess {Object[]} rows List of schedules.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query({
    experience: { paths: ['experience'] },
  }, {
    experience: true,
  }),
  index)

/**
 * @api {get} /schedules/:id Retrieve schedule
 * @apiName RetrieveSchedule
 * @apiGroup Schedule
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} schedule Schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /schedules/:id Update schedule
 * @apiName UpdateSchedule
 * @apiGroup Schedule
 * @apiPermission owner
 * @apiParam {String} access_token owner access token.
 * @apiParam {String} day Schedule's day.
 * @apiParam {String} start Schedule's start.
 * @apiParam {ObjectId} experience Schedule's experience.
 * @apiParam {Date} date Schedule's date.
 * @apiSuccess {Object} schedule Schedule's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Schedule not found.
 * @apiError 401 owner access only.
 */
router.put('/:id',
  token({ required: true, roles: ['owner'] }),
  body({ day, start, experience, date }),
  update)

/**
 * @api {delete} /schedules/:id Delete schedule
 * @apiName DeleteSchedule
 * @apiGroup Schedule
 * @apiPermission owner
 * @apiParam {String} access_token owner access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Schedule not found.
 * @apiError 401 owner access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['owner'] }),
  destroy)

export default router
