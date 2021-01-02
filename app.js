//qqxSCdtQRc4xEaWt
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURL} = require('./keys')

require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))


mongoose.connect(MONGOURL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

mongoose.connection.on('connected', () =>{
	console.log('connected to mongoDB')
})

mongoose.connection.on('error', (err) =>{
	console.log('error connecting to mongoDB', err)
})

app.listen(PORT, () => {
    console.log('server in running', PORT)
})