const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(
  cors({
    origin: ['https://deploy-mern-1whq.vercel.app'],
    methods: ['POST', 'GET'],
    credentials: true,
  })
)
app.use(express.json())

const dbURI =
  'mongodb+srv://zihadul708:01882343242@nodetuts.xnfrv.mongodb.net/messages?retryWrites=true&w=majority&appName=nodetuts'

// Corrected the variable name to `dbURI`
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const messageSchema = new mongoose.Schema({
  username: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
})

const Message = mongoose.model('Message', messageSchema)

app.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find()
    res.json(messages)
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving messages' })
  }
})

app.post('/messages', async (req, res) => {
  try {
    const message = new Message(req.body)
    await message.save()
    res.json(message)
  } catch (error) {
    res.status(500).json({ message: 'Error saving message' })
  }
})

app.listen(5000, () => console.log('Server running on http://localhost:5000'))
