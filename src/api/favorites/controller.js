import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Favorites } from '.'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Favorites.create({ ...body, user })
    .then((favorites) => favorites.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Favorites.count(query)
    .then(count => Favorites.find(query, select, cursor)
      .populate('user')
      .populate('experiences')
      .then((favorites) => favorites.filter((favorite, i) => favorite.experiences != null)) // valida que la experiencia no ha sido borrada
      .then((favorites) => ({
        count,
        rows: favorites.map((favorite) => favorite.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Favorites.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((favorites) => favorites ? favorites.remove() : null)
    .then(success(res, 204))
    .catch(next)
