import { success, notFound } from '../../services/response/'
import { Images } from '.'
import { Experiences } from '../experiences'

export const create = (req, res, next) => {
  let elementName = [];

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ err: 'No files were uploaded.' });
  }
  for (let index = 0; index < req.files.length; index++) {
    elementName.push('/static/' + req.files[index]["filename"].trim());
  }
  elementName.map((i) => {
    Images.create({ name: i, experiences: req.body.experiencesId }).then(async (success) => {
      await Experiences.findByIdAndUpdate({ _id: req.body.experiencesId }, { pictures: elementName });
    }).catch(err => console.log(err));
  })

  return res.status(201).send({ msg: 'Images was uploaded.', images_path: elementName });
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Images.count(query)
    .then(count => Images.find(query, select, cursor)
      .then((images) => ({
        count,
        rows: images.map((images) => images.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Images.findById(params.id)
    .then(notFound(res))
    .then((images) => images ? images.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Images.findById(params.id)
    .then(notFound(res))
    .then(async (images) => {

      images.remove();
      
      const dataImages = await Images.find({ experiences: params.experiencesId });
      let imagesNew = [];
      
      dataImages.map(async (i) => {
        imagesNew.push(i.name);
        await Experiences.findByIdAndUpdate({ _id: i.experiences }, { pictures: imagesNew });
      })

      return "null"
    })
    .then(success(res, 204))
    .catch(next)
