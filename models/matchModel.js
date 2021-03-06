const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')
const Schema = mongoose.Schema
const constants = require('../commons/constants')

const {
  matches: {
    status: { INICIATED, CANCELATED, ACTIVE, ENDED, ANULATED },
  } } = constants;


const MatchSchema = new Schema({
  guide: { type: String, required: true },
  tourist: { type: String, required: true },
  chatId: { type: String, required: true },
  status: {
    type: String,
    enum: [INICIATED, CANCELATED, ACTIVE, ENDED, ANULATED],
    required: true,
    default: ACTIVE
  },
})

MatchSchema.plugin(timestamps, {
  createdAt: 'createdAt',
  updatedAt: 'modifiedAt'
})

MatchSchema.options.toJSON = {
  transform: function (doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('matches', MatchSchema)
