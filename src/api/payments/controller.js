import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Payments } from '.'
import { Experiences } from '../experiences'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Payments.create({ ...body, user })
    .then(async (payments) => {
      if (payments.pay) {
        const params = {
          _id: body.experiences
        }

        const experience = await Experiences.findById(params._id);
        const users = parseInt(payments.adult) + parseInt(payments.children);
        const newQuotas = (parseInt(experience.quotas) - parseInt(users))

        const data = {
          body: {
            quotas: newQuotas.toString(),
          }
        }
        await Experiences.findByIdAndUpdate(params._id, data.body);
      }
      res.json(payments.view(true))
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Payments.count(query)
    .then(count => Payments.find(query, select, cursor)
      .populate('card')
      .populate({ path: 'experiences', select: 'name description', populate: { path: 'user', select: 'name email' } })
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
    .populate('card')
    .populate({ path: 'experiences', select: 'name description', populate: { path: 'user', select: 'name email' } }).then(notFound(res))
    .then((payments) => payments ? payments.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Payments.findById(params.id)
    .populate('card')
    .populate({ path: 'experiences', select: 'name description', populate: { path: 'user', select: 'name email' } }).then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((payments) => payments ? Object.assign(payments, body).save() : null)
    .then(async (payments) => {
      if (payments.pay) {
        const params = {
          _id: payments.experiences
        }

        const experience = await Experiences.findById(params._id);
        const users = parseInt(payments.adult) + parseInt(payments.children);
        const newQuotas = (parseInt(experience.quotas) - parseInt(users))

        const data = {
          body: {
            quotas: newQuotas.toString(),
          }
        }
        await Experiences.findByIdAndUpdate(params._id, data.body);
      }

      res.json(payments ? payments.view(true) : null)
    })
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Payments.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((payments) => payments ? payments.remove() : null)
    .then(success(res, 204))
    .catch(next)
