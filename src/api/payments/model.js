import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const paymentsSchema = new Schema({
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
  date: {
    type: Array
  },
  adult: {
    type: String,
    default: "0"
  },
  children: {
    type: String,
    default: "0"
  },
  enabled: {
    type: Boolean,
    default: false
  },
  card: {
    type: Schema.ObjectId,
    ref: 'Card',
    required: true
  },
  mount: {
    type: String
  },
  pay: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

paymentsSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      experiences: this.experiences.view(full),
      date: this.date,
      adult: this.adult,
      children: this.children,
      card: this.card.view(full),
      mount: this.mount,
      pay: this.pay,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

paymentsSchema.plugin(mongooseKeywords, { paths: ['user'] })

const model = mongoose.model('Payments', paymentsSchema)

export const schema = model.schema
export default model
