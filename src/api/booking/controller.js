import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Booking } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Booking.create({ ...body, user })
    .then((booking) => booking.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Booking.count(query)
    .then(count => Booking.find(query, select, cursor)
      .populate('user')
      .populate('experiences')
      .then((bookings) => ({
        count,
        rows: bookings.map((booking) => booking.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Booking.findById(params.id)
    .populate('user')
    .populate('experiences')
    .then(notFound(res))
    .then((booking) => booking ? booking.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Booking.findById(params.id)
    .populate('user')
    .populate('experiences')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((booking) => booking ? Object.assign(booking, body).save() : null)
    .then((booking) => booking ? booking.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Booking.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((booking) => booking ? booking.remove() : null)
    .then(success(res, 204))
    .catch(next)
