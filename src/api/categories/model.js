import mongoose, { Schema } from 'mongoose'

const categoriesSchema = new Schema({
  name: {
    type: String
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

categoriesSchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      category: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full ? {
      ...view
    } : view
  }
}

const model = mongoose.model('categories', categoriesSchema)

export const schema = model.schema
export default model
