import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Messages } from '.'
import { User } from '../user'
import { sendNotification } from "../../services/firebase/send-message";

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
