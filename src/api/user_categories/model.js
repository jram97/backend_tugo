import mongoose, { Schema } from 'mongoose'

const userCategorySchema = new Schema({
  user: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }],
  categories: {
    type: Schema.ObjectId,
    ref: 'categories'
  }
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

userCategorySchema.methods = {
  view (full) {
    const view = {
      id: this.id,
      user: this.user,
      categories: this.categories.view(full)
    }
    return full ? {
      ...view
    } : view
  }
}

const model = mongoose.model('userCategories', userCategorySchema)
export const schema = model.schema
export default model
