const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
	name:  {
		type: String,
		required: true
	},

	email: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},

	followers:[{
		type:ObjectId,
		 ref:'user'
		}],

	pic: {
		type: String,
		default: 'https://res.cloudinary.com/iqoffee/image/upload/v1612085640/index_ew1dh7.png'
	},

	following:[{
		type:ObjectId,
		 ref:'user'
		}],

})

mongoose.model('User', userSchema)