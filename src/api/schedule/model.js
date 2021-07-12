import mongoose, { Schema } from 'mongoose'

const scheduleSchema = new Schema({
  day: {
    type: String
  },
  start: {
    type: String
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  experience: {
    type: Schema.ObjectId,
    ref: 'Experiences',
    required: true
  },
  date: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

scheduleSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      day: this.day,
      user: this.user,
      start: this.start,
      end: this.end,
      experience: this.experience.view(full),
      date: this.date,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Schedule', scheduleSchema)

export const schema = model.schema
export default model
