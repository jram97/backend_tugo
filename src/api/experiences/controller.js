import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Experiences } from '.'

import { categories } from '../categories'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Experiences.create({ ...body, user })
    .then((experiences) => experiences.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Experiences.count(query)
    .then(count => Experiences.find(query, select, cursor)
      .populate('user', 'name email picture phone')
      .then((experiences) => ({
        count,
        rows: experiences.map((experiences) => experiences.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const indexRating = ({ querymen: { query, select, cursor } }, res, next) =>
  Experiences.count(query) 
    .then(count => Experiences.find(query, select, cursor)
      .populate('user', 'name email picture phone')
      .then((experiences) => ({
        count,
        rows: experiences.map((experiences) => experiences.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Experiences.findById(params.id)
    .populate('user', 'name email picture phone')
    .then(notFound(res))
    .then((experiences) => experiences ? experiences.view() : null)
    .then(success(res))
    .catch(next)

export const showByCategory = ({ params }, res, next) =>
  Experiences.find({ category: params.idCategory })
    .populate('category', 'name')
    .then(notFound(res))
    .then((experiences) => ({
      count: experiences.length,
      rows: experiences.map((exp) => exp.view())
    }))
    .then(success(res))

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Experiences.findById(params.id)
    .populate('user', 'name email picture phone')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((experiences) => experiences ? Object.assign(experiences, body).save() : null)
    .then((experiences) => experiences ? experiences.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Experiences.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((experiences) => experiences ? experiences.remove() : null)
    .then(success(res, 204))
    .catch(next)
