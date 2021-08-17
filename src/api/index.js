import { Router } from 'express'
import auth from './auth'
import user from './user'
import experiences from './experiences'
import favorites from './favorites'
import card from './cards'
import review from './review'
import images from './images'
import payments from './payments'
import messages from './messages'
import schedule from './schedule'
import categories from './categories'
import userCategories from './user_categories'


const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/', (req, res, next) => {
  res.status(200).end('Tugo Api')
})
router.use('/auth', auth)
router.use('/users', user)
router.use('/experiences', experiences)
router.use('/favorites', favorites)
router.use('/cards', card)
router.use('/reviews', review)
router.use('/images', images)
router.use('/payments', payments)
router.use('/messages', messages)
router.use('/schedules', schedule)
router.use('/categories', categories)
router.use('/user_categories', userCategories)

export default router
