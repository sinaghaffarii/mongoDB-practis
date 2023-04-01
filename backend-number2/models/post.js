const mongoose = require('mongoose')

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    // با این روش پایینی دو تا از اسکیماها رو به هم دیگه وصل میکنیم
    creator: { type: mongoose.Types.ObjectId, required: true,  ref: 'User'}
})

module.exports = mongoose.model('Post', postSchema)