import mongoose, { Schema } from 'mongoose'
import mongooseKeywords from 'mongoose-keywords'

const couponSize = 11
// Para establecer las tarifas, cupones y descuento
const experiencePricesSchema = new Schema({
  adultPrice: String,
  childrenPrice: String,
  coupon: {
    code: {
      type: String,
      minlength: couponSize,
      maxlength: couponSize
    },
    discount: {
      type: Number
    }
  },
  discount: {
    price: String,
    people: Number
  }
})

const experiencesSchema = new Schema({
  user: [{
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  }],
  category: [{
    type: Schema.ObjectId,
    ref: 'categories'
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
  lat: {
    type: String
  },
  long: {
    type: String
  },
  price: experiencePricesSchema,
  start: {
    type: String
  },
  end: {
    type: String
  },
  quotas: {
    type: String
  },
  duration: {
    type: String
  },
  extra: [{
    type: Object
  }],
  pictures: [{
    type: Object
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
      category: this.category.map((category) => category.view(full)),
      user: this.user,
      name: this.name,
      description: this.description,
      price: this.price,
      duration: this.duration,
      quotas: this.quotas,
      start: this.start,
      end: this.end,
      lat: this.lat,
      long: this.long,
      extra: this.extra,
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

experiencesSchema.plugin(mongooseKeywords, { paths: ['name', 'description', 'price'] })

const model = mongoose.model('Experiences', experiencesSchema)

export const schema = model.schema
export default model
