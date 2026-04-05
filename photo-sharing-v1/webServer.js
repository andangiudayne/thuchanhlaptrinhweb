const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());

// Nhập dữ liệu từ file models.js đã sửa module.exports
const models = require('./src/modelData/models.js'); 

// 1. API: /test/info trả về models.schemaInfo() [cite: 72]
app.get('/test/info', (req, res) => {
  res.json(models.schemaInfo());
});

// 2. API: /user/list trả về models.userListModel() [cite: 73]
app.get('/user/list', (req, res) => {
  res.json(models.userListModel());
});

// 3. API: /user/:id trả về models.userModel(id) [cite: 74]
app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  const user = models.userModel(id);
  if (!user) {
    res.status(400).send("User not found");
    return;
  }
  res.json(user);
});

// 4. API: /photosOfUser/:id trả về models.photoOfUserModel(id) [cite: 75]
app.get('/photosOfUser/:id', (req, res) => {
  const id = req.params.id;
  const photos = models.photoOfUserModel(id);
  if (!photos) {
    res.status(400).send("Photos not found");
    return;
  }
  res.json(photos);
});

app.listen(port, () => {
  console.log(`Server đang chạy tại http://localhost:${port}`);
});