const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const postShema = new mongoose.Schema({
	title:{
		type: String,
		required: true
	},
	body:{
		type: String,
		required: true
	},
	photo:{
		type: String,
		default: 'no photo'
	},
	posttedBy:{
		type: ObjectId,
		ref: 'User'
	}
})

mongoose.model('Post', postShema)