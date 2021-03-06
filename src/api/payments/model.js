import mongoose, { Schema } from 'mongoose'

const paymentsSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  booking: {
    type: Schema.ObjectId,
    ref: 'Booking',
    required: true
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
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      booking: this.booking.view(full),
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

const model = mongoose.model('Payments', paymentsSchema)

export const schema = model.schema
export default model
