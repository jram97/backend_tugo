import mongoose, { Schema } from 'mongoose'

const reviewSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  experiences: {
    type: Schema.ObjectId,
    ref: 'Experiences',
    required: true
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  star: {
    type: String
  },
  pictures: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reviewSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      experiences: this.experiences.view(full),
      title: this.title,
      description: this.description,
      star: this.star,
      pictures: this.pictures,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Review', reviewSchema)

export const schema = model.schema
export default model
