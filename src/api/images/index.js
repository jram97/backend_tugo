import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, destroy } from './controller'
import { schema } from './model'
var multer  = require('multer')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './src/public/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '-').trim())
  }
})

var upload = multer({ storage: storage })
export Images, { schema } from './model'

const router = new Router()
const { name } = schema.tree

/**
 * @api {post} /images Create images
 * @apiName CreateImages
 * @apiGroup Images
 * @apiPermission owner, admin
 * @apiParam {[File]} name Send files.
 * @apiParam {ObjectId} experiencesId Experience's Object Id.
 * @apiSuccess {Object} images Images's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Images not found.
 */
router.post('/',
  token({ required: true, roles: ['owner', 'admin'] }),
  upload.array('name', 12),
  create)

/**
 * @api {get} /images Retrieve images
 * @apiName RetrieveImages
 * @apiGroup Images
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of images.
 * @apiSuccess {Object[]} rows List of images.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /images/:id Retrieve images
 * @apiName RetrieveImages
 * @apiGroup Images
 * @apiSuccess {Object} images Images's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Images not found.
 */
router.get('/:id',
  show)

/**
 * @api {delete} /images/:id/:experiencesId Delete images
 * @apiName DeleteImages
 * @apiGroup Images
 * @apiPermission owner, admin
 * @apiParam {String} access_token user access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Images not found.
 * @apiError 401 user access only.
 */
router.delete('/:id/:experiencesId',
  token({ required: true, roles: ['owner', 'admin'] }),
  destroy)

export default router
