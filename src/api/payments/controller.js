import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Payments } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Payments.create({ ...body, user })
    .then((payments) => payments.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) => 
  Payments.count(query)
    .then(count => Payments.find(query, select, cursor)
      .populate('card')
      .populate({ path: 'booking', populate: { path: 'experiences', select: 'name description user' } })
      .then((payments) => ({
          count,
          rows: payments.map((payments) => payments)
        })
      )
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Payments.findById(params.id)
    .populate('user')
    .populate('card')
    .populate('booking')
    .then(notFound(res))
    .then((payments) => payments ? payments.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Payments.findById(params.id)
    .populate('user')
    .populate('card')
    .populate('booking')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((payments) => payments ? Object.assign(payments, body).save() : null)
    .then((payments) => payments ? payments.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Payments.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((payments) => payments ? payments.remove() : null)
    .then(success(res, 204))
    .catch(next)
