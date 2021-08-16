import { success, notFound } from '../../services/response/'
import { User } from '.'
import { sign } from '../../services/jwt'
import { token } from '../../services/passport';

import { Card } from '../cards'

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
  User.findOne({ phone: query.phone })
    .then((user) => user ? "This phone is not available" : "This phone is available")
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
export const uploadPicture = async (req, res, next) => {
  const { id } = req.user

  if (!req.file) {
    return res.status(400).send({ err: 'You need to upload a file' })
  }
  const name = '/static/' + req.file["filename"].trim()
  const imagePath = {
    path: name
  }
  const urlPath = req.protocol + '://' + req.get('host') + imagePath.path

  try {
    await User.findByIdAndUpdate({ _id: id }, { picture: imagePath.path })
  } catch (error) {
    console.log(error)
  }

  return res.status(200).send({ msg: 'The picture was upload', picture_path: urlPath })
}
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

export const cards = ({ user }, res, next) => {
  Card.find({ user })
    .then((cards) => ({
      count: cards.length,
      rows: cards.map((card) => card.view(true))
    }))
    .then(success(res))
    .catch(next)
}

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

export const changeState = async (req, res, next) => {
  // 0 -> As User
  // 1 -> As User and Owner
  const switchCode = req.headers['user-switch']
  let role
  
  if (parseInt(switchCode) === 1) {
    role = 'owner'
  } else {
    role = 'user'
  }

  const userId = req.user['_id']
  await User.findByIdAndUpdate({ _id: userId }, { state: switchCode, role: role }, { new: true })
    .then(async (user) => {
      const newToken = await sign(user.id, { expiresIn: '24h' })

      const infoExtra = {
        alias: user.alias,
        email: user.email,
        picture: user.picture,
        role: user.role,
        phone: user.phone,
        direction: user.direction
      }

      user.infoExtra = infoExtra

      // user.save()

      res.status(200).json({
        token: newToken,
        msg: `The state was updated to ${role}`,
        state: switchCode,
        user: user.view()
      })
    })
    .catch(next)
}
