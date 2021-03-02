import { success, notFound, authorOrAdmin } from '../../services/response'
import { Card } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Card.create({ ...body, user })
    .then((card) => card.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Card.count(query)
    .then(count => Card.find(query, select, cursor)
      .populate('user')
      .then((cards) => ({
        count,
        rows: cards.map((card) => card.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Card.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((card) => card ? card.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Card.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((card) => card ? Object.assign(card, body).save() : null)
    .then((card) => card ? card.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Card.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((card) => card ? card.remove() : null)
    .then(success(res, 204))
    .catch(next)
