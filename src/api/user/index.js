import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { password as passwordAuth, token } from '../../services/passport'
import { index, showMe, cards, show, create, update, updatePassword, destroy, sendcode, receivecode, assingToken, findByPhone, uploadPicture, changeState } from './controller'
import { schema } from './model'
export User, { schema } from './model'

//Multer
const multer = require('multer')

const pictureStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/public/')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s/g, '-').trim())
  }
})

const upload = multer({ storage: pictureStorage })

const router = new Router()
const { email, password, picture, phone, role, firebaseTokens, name, description, birthday, gender, direction, alias, infoExtra } = schema.tree

/**
 * @api {get} /users Retrieve users
 * @apiName RetrieveUsers
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Object[]} users List of users.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/',
  token({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /users/phone-available?phone= Available phone
 * @apiName AvailablePhone
 * @apiGroup User
 * @apiSuccess {Object} user Available phone.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/phone-available',
  findByPhone)

/**
 * @api {get} /users/my-cards Retrieve user's cards
 * @apiName MyCards
 * @apiGroup User
 * @apiPermission admin,user,owner
 * @apiParam {String} access_token User access_token.
 * @apiUse listParams
 * @apiSuccess {Int} count total cards
 * @apiSuccess {Object[]} rows of user's cards.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Admin access only.
 */
router.get('/my-cards',
  token({ required: true, roles: ['user', 'owner', 'admin'] }),
  cards)

/**
 * @api {get} /users/me Retrieve current user
 * @apiName RetrieveCurrentUser
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiSuccess {Object} user User's data.
 */
router.get('/me',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  showMe)

/**
 * @api {get} /users/:id Retrieve user
 * @apiName RetrieveUser
 * @apiGroup User
 * @apiPermission public
 * @apiSuccess {Object} user User's data.
 * @apiError 404 User not found.
 */
router.get('/:id',
  show)

/**
 * @api {post} /users Create user
 * @apiName CreateUser
 * @apiGroup User
 * @apiParam {String} [email] User's email.
 * @apiParam {String{6..}} password User's password.
 * @apiParam {String} [name] User's name.
 * @apiParam {String} phone User's phone.
 * @apiParam {String} [picture] User's picture.
 * @apiParam {String=user,admin,owner} [role=user] User's role.
 * @apiSuccess (Sucess 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 409 Email already registered.
 */
router.post('/',
  body({ email, password, name, picture, phone, role }),
  create)

/**
 * @api {post} /picture Set user picture
 * @apiName UploadUserPicture
 * @apiGroup User
 * @apiPermission admin,user,owner
 * @apiParam {String} access_token User access_token.
 * @apiParam {File} picture User's picture file.
 * @apiSuccess {Object} object with msg and picture path fields.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.post('/picture',
  token({ required: true, roles: ['admin', 'owner', 'user'] }),
  upload.single('picture'),
  uploadPicture)

/**
 * @api {put} /users/:id Update user
 * @apiName UpdateUser
 * @apiGroup User
 * @apiPermission admin,user,owner
 * @apiParam {String} access_token User access_token.
 * @apiParam {String} name User's name.
 * @apiParam {String} phone User's phone.
 * @apiParam {String} description User's description.
 * @apiParam {String} birthday User's birthday.
 * @apiParam {String} gender User's gender.
 * @apiParam {String} direction User's direction.
 * @apiParam {String} alias User's alias.
 * @apiParam {String} [picture] User's picture.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  body({ phone, picture, name, description, birthday, gender, direction, alias, infoExtra }),
  update)

/**
 * @api {put} /users/token/:id Add Firebase Token for User
 * @apiName AgregarUserTokenFirebase
 * @apiGroup User
 * @apiPermission user
 * @apiParam {String} access_token User access_token.
 * @apiParam {[String]} firebaseTokens User's firebaseTokens.
 * @apiSuccess {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user or admin access only.
 * @apiError 404 User not found.
 */
router.put('/token/:id',
  token({ required: true, roles: ['owner', 'user', 'admin'] }),
  body({ firebaseTokens }),
  assingToken)

/**
 * @api {put} /users/:id/password Update password
 * @apiName UpdatePassword
 * @apiGroup User
 * @apiHeader {String} Authorization Basic authorization with email and password.
 * @apiParam {String{6..}} password User's new password.
 * @apiSuccess (Success 201) {Object} user User's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Current user access only.
 * @apiError 404 User not found.
 */
router.put('/:id/password',
  passwordAuth(),
  body({ password }),
  updatePassword)

/**
 * @api {delete} /users/:id Delete user
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission admin
 * @apiParam {String} access_token User access_token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 401 Admin access only.
 * @apiError 404 User not found.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

/**
 * @api {post} /users/send-code Send Code Verification
 * @apiName SendCode
 * @apiGroup User
 * @apiParam {String} phone The user's phone where the code verification will be sent.
 * @apiSuccess (Sucess 201) {Object[]} data Receive from Twilio.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Credentials error from Twilio.
 */
router.post('/send-code',
  sendcode)



/**
 * @api {post} /users/receive-code Receive Code Verification
 * @apiName ReceiveCode
 * @apiGroup User
 * @apiParam {String} phone The user's phone where the code verification was sent.
 * @apiParam {String} code The code that was sent.
 * @apiSuccess {Object[]} data Receive from Twilio.
 * @apiError (Sucess 201) {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 Credentials error from Twilio.
 */
router.post('/receive-code',
  receivecode)

// This route change the state, 0 = user, 1 = user,owner
// The frontEnd need this to display a different information
router.post('/switchUser', token({ required: true, roles: ['owner', 'user'] }), changeState)

export default router
