import { success, notFound } from '../../services/response/'
import { userCategories } from '.'

export const saveCategory = ({ user, bodymen: { body } }, res, next) =>
  userCategories.create({ ...body, user })
    .then((categories) => categories.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  userCategories.find(query, select, cursor)
    .populate('user', 'name')
    .populate('categories', 'name')
    .then((categories) => ({
      count: categories.length,
      rows: categories.map(category => category.view(true))
    }))
    .then(success(res))

export const updateCategories = ({ bodymen: { body }, params }, res, next) => {
  let { user_id } = params
  userCategories.find({ user: user_id })
    .then(notFound(res))
    .then((data) => data ? Object.assign(data[0], body).save() : null)
    .then((data) => data ? data.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  userCategories.findById(params.id)
    .then(notFound(res))
    .then((category) => category ? category.remove() : null)
    .then(success(res, 204))
    .catch(next)
