import { success, notFound, authorOrAdmin } from '../../services/response/'
import { Review } from '.'
import { Experiences } from '../experiences'

export const create = ({ user, bodymen: { body } }, res, next) =>
  Review.create({ ...body, user })
    .then(async (review) => {

      const params = {
          _id: body.experiences
      }

      const experience = await Experiences.findById(params._id);

        const votes = parseInt(experience.count_votes) + 1
        const tscore = parseInt(experience.total_score) + parseInt(body.star)
        const rating = tscore / votes;

        const data = {
          body: {
            count_votes: votes,
            total_score: tscore,
            rating: parseFloat(rating).toFixed(2)
          }
        }
        await Experiences.findByIdAndUpdate(params._id, data.body);

      res.json(review.view())
    })
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Review.count(query)
    .then(count => Review.find(query, select, cursor)
      .populate('user')
      .then((reviews) => ({
        count,
        rows: reviews.map((review) => review.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Review.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then((review) => review ? review.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ user, bodymen: { body }, params }, res, next) =>
  Review.findById(params.id)
    .populate('user')
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((review) => review ? Object.assign(review, body).save() : null)
    .then((review) => review ? review.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ user, params }, res, next) =>
  Review.findById(params.id)
    .then(notFound(res))
    .then(authorOrAdmin(res, user, 'user'))
    .then((review) => review ? review.remove() : null)
    .then(success(res, 204))
    .catch(next)
