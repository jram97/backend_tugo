import mongoose, { Schema } from 'mongoose'

const bookingSchema = new Schema({
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
    type: String
  },
  places: {
    type: String,
    required: true
  },
  price: {
    type: String
  },
  enabled: {
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

bookingSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      experiences: this.experiences.view(full),
      date: this.date,
      places: this.places,
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

const model = mongoose.model('Booking', bookingSchema)

export const schema = model.schema
export default model
