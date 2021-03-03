import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Messages } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Messages.create({ ...body, user_from: user })
    .then((messages) => messages.view(true))
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
