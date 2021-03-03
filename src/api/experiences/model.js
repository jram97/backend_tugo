import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const experiencesSchema = new Schema({
  user: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }],
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  direction: {
    type: String
  },
  pictures: [{
    type: String
  }],
  count_votes: {
    type: Number,
    default: 0
  },
  total_score: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    index: true,
    default: 0
  },
  enabled: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

experiencesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      name: this.name,
      description: this.description,
      pictures: this.pictures,
      direction: this.direction,
      count_votes: this.count_votes,
      total_score: this.total_score,
      rating: this.rating,
      enabled: this.enabled,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

experiencesSchema.plugin(mongooseKeywords, { paths: ['rating'] })

const model = mongoose.model('Experiences', experiencesSchema)

export const schema = model.schema
export default model
