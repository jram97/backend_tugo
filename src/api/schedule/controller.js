import { success, notFound } from '../../services/response/'
import { Schedule } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Schedule.create(body)
    .then((schedule) => schedule.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Schedule.count(query)
    .then(count => Schedule.find(query, select, cursor)
      .populate('user', 'name email picture phone description')
      .then((schedules) => ({
        count,
        rows: schedules.map((schedule) => schedule.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Schedule.findById(params.id)
    .populate('user', 'name email picture phone description')
    .then(notFound(res))
    .then((schedule) => schedule ? schedule.view() : null)
    .then(success(res))
    .catch(next)

export const showByDay = ({ querymen: { query, select, cursor } }, res, next) => 
  Schedule.count(query)
    .then(count => Schedule.find(query, select, cursor)
      .populate('user', 'name email picture phone description')
      .then((schedules) => ({
        count,
        rows: schedules.map(schedule => schedule.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Schedule.findById(params.id)
    .then(notFound(res))
    .then((schedule) => schedule ? Object.assign(schedule, body).save() : null)
    .then((schedule) => schedule ? schedule.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Schedule.findById(params.id)
    .then(notFound(res))
    .then((schedule) => schedule ? schedule.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const destroyAll = ({ params }, res, next) => {
  Schedule.deleteMany()
    .then(success(res, 204))
    .catch(next)
}
