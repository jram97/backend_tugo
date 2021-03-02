import mongoose, { Schema } from 'mongoose'

const cardSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String
  },
  card: {
    type: String
  },
  date: {
    type: String
  },
  cvv: {
    type: String
  },
  name: {
    type: String
  },
  ip: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

cardSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      type: this.type,
      card: this.card,
      date: this.date,
      cvv: this.cvv,
      name: this.name,
      ip: this.ip,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Card', cardSchema)

export const schema = model.schema
export default model
