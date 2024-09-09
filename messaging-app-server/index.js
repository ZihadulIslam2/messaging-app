const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://zihadul708:01882343242@nodetuts.xnfrv.mongodb.net/messaging-app?retryWrites=true&w=majority&appName=nodetuts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)

const messageSchema = new mongoose.Schema({
  username: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
})

const Message = mongoose.model('Message', messageSchema)

app.get('/messages', async (req, res) => {
  const messages = await Message.find()
  res.json(messages)
})

app.post('/messages', async (req, res) => {
  const message = new Message(req.body)
  await message.save()
  res.json(message)
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'))
