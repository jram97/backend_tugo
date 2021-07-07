import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Messages } from '.'
import { User } from '../user'
import { sendNotification } from "../../services/firebase/send-message";
import mongoose from 'mongoose';

export const create = ({ user, bodymen: { body } }, res, next) =>
  Messages.create({ ...body, user_from: user })
    .then(async (messages) => {

      const from = await User.findById({_id: messages.user_from._id})
      const by = await User.findById({_id: messages.user_by._id})

      if (by.firebaseTokens.length > 0) {
        const payload = {
          notification: {
            title: "New Message",
            body: "You have a new message from: " + from.name
          }
        }
        await sendNotification(by.firebaseTokens, payload);
      }
      return messages.view(true)
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => {

  Messages.count(query)
    .then(count => Messages.find(query, select, cursor)
      .populate('user_from')
      .populate('user_by')
      .then((messages) => ({
        count,
        rows: messages.map((messages) => messages.view())
      }))
    )
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Messages.findById(params.id)
    .populate('user_from')
    .populate('user_by')
    .then(notFound(res))
    .then((messages) => messages ? messages.view() : null)
    .then(success(res))
    .catch(next)

export const loadChat = ({ user, params }, res, next) =>
  Messages.aggregate([
    {
      $match: {
        $or: [
          { user_from: new mongoose.Types.ObjectId(params.by) },
          { user_by: new mongoose.Types.ObjectId(params.by) }
        ]
      }
    },
    { $sort: { updatedAt: -1 } },
    {
      $group: {
        _id: {
          $cond: [
            { $eq: ['$user_by', new mongoose.Types.ObjectId(params.by)] },
            { $concat: [{ $toString: '$user_by' }, ' and ', { $toString: '$user_from' }] },
            { $concat: [{ $toString: '$user_from' }, ' and ', { $toString: '$user_by' }] }
          ]
        },
        messages: { $push: '$$ROOT' }
      }
    },
    { $sort: { updatedAt: -1 } }
    // Limitar los mensajes a mandar
    // { $addFields: { messages: { $slice: ['$messages', 3] } } }
  ])
    .then((data) => {
      const messages = []
      data.forEach((result) => {
        result.messages.forEach((m) => {
          // valida que el usuario del token se encuentre en los mensajes
          // eslint-disable-next-line eqeqeq
          if (m.user_by == user.id || m.user_from == user.id) {
            messages.push(m) // push, si hay coincidencia
          }
        })
      })

      return {
        count: messages.length,
        row: messages.map((message) => {
          const { _id, read, user_by, user_from, text, createdAt, updatedAt } = message
          return { _id, read, user_by, user_from, text, createdAt, updatedAt }
        })
      }
    })
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Messages.findById(params.id)
    .populate('user_from')
    .populate('user_by')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user_from'))
    .then((messages) => messages ? Object.assign(messages, body).save() : null)
    .then((messages) => messages ? messages.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Messages.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user_from'))
    .then((messages) => messages ? messages.remove() : null)
    .then(success(res, 204))
    .catch(next)
