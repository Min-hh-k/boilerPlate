const express = require('express')
const app = express()
const port = 5000

const bodyParser = require('body-parser')
const { User } = require("./models/User")

// 데이터를 분석해서 가져옴, application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://minhyeok:fb9147fb@boiler.fw55l.mongodb.net/?retryWrites=true&w=majority', {
  // useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDb Connected..'))
.catch(err => console.log('error'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.post('/register', (req,res) => {
  // 회원 가입할 때 필요한 정보들 client 에서 가져오면 , 그것들을 데이터 베이스에 넣어준다.
  const user = new User(req.body)
  user.save((err, doc) => {
    if(err) return res.json({ success: false, err})
    return res.status(200).json({ //res.status(200) == 성공
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})