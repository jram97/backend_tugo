import { success, notFound, authorOrAdmin } from '../../services/response/'
import { categories } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  categories.create(body)
    .then((category) => category.view())
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  categories.count(query)
    .then(count => categories.find(query, select, cursor)
      .then((categories) => ({
        count,
        rows: categories.map(category => category.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const update = ({ user, params, bodymen: { body } }, res, next) =>
  categories.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((category) => category ? Object.assign(category, body).save() : null)
    .then((category) => category ? category.view(true) : null)
    .then(success(res))
    .catch(next)

export const show = (req, res, next) =>
  categories.findById(req.params.id)
    .then(notFound(res))
    .then((category) => category.view())
    .then(success(res))
    .catch(next)

export const destroy = (req, res, next) =>
  categories.findById(req.params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, req.user, 'user'))
    .then((category) => category ? category.remove() : '')
    .then(success(res, 204))
    .catch(next)
