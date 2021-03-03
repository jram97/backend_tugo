import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const messagesSchema = new Schema({
  user_from: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  user_by: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String
  },
  read: {
    type: Boolean,
    default: false,
    index: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

messagesSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user_from: this.user_from.view(full),
      user_by: this.user_by.view(full),
      text: this.text,
      read: this.read,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

messagesSchema.plugin(mongooseKeywords, { paths: ['user_from', 'user_by', 'read'] })

const model = mongoose.model('Messages', messagesSchema)

export const schema = model.schema
export default model
