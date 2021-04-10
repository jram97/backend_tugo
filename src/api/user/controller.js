import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'
import { token } from '../../services/passport';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const findByPhone = ({ query }, res, next) =>
  User.findOne({phone: query.phone})
    .then(notFound(res))
    .then((user) => user ? "This phone is not available" : null)
    .then(success(res))
    .catch(next)


export const showMe = ({ user }, res) =>
  res.json(user.view(true))

export const create = ({ bodymen: { body } }, res, next) =>
  User.create(body)
    .then(user => {
      sign(user.id)
        .then((token) => ({ token, user: user.view(true) }))
        .then(success(res, 201))
    })
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        res.status(409).json({
          valid: false,
          param: 'email',
          message: 'email already registered'
        })
      } else {
        next(err)
      }
    })

export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const assingToken = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => {
      if (user) {
        if (body.firebaseTokens) {
          if (!user.firebaseTokens.includes(body.firebaseTokens)) {
            return Object.assign(user, user.firebaseTokens.push(body.firebaseTokens)).save()
          } else {
            return res.json("Token already exist");
          }
        } else {
          return null;
        }
      } else {
        return null;
      }
    })
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)


export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const sendcode = async (req, res, next) =>
  await client.verify.services(process.env.TWILIO_SERVICE_SID).verifications.create({ to: `+${req.body.phone}`, channel: 'sms' })
    .then(data => {
      res.status(201).json({
        valid: true,
        data: data
      })
    })
    .catch(next)

export const receivecode = async (req, res, next) =>
  await client.verify.services(process.env.TWILIO_SERVICE_SID).verificationChecks.create({ to: `+${req.body.phone}`, code: `${req.body.code}` })
    .then(data => {
      if (data.status === "approved") {
        res.status(200).json({
          valid: true,
          status: data.status,
          data: data
        })
      }
    })
    .catch(next)