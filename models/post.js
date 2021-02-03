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
		required: true
	},
	likes: [{
		type: ObjectId,
		ref: 'User'
	}],
	comments: [{
		text: String,
		postedBy: {
			type: ObjectId,
			ref: 'User'
		}
	}],
	postedBy:{
		_id:{ 
			type:  ObjectId,
			ref: 'User'
		},
		name:{
			type: String,
			required: true
		} 
		
	}
})

mongoose.model('Post', postShema)