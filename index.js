const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const authorRoutes = require('./routes/author')
const bookRoutes = require('./routes/book')

//CONNECT DATABASE MONGODB (mongodb@4.0)
dotenv.config()
// Thay vì sử dụng callback, sử dụng Promises hoặc async/await
mongoose
  .connect((process.env.MONGODB_URL), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    // Thực hiện các tác vụ sau khi kết nối thành công
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Rest of your Express app setup and routes


app.use(bodyParser.json({ limit: "50mb" }))
app.use(cors())
app.use(morgan("common"))

//ROUTES
app.use("/v1/author" ,authorRoutes)
app.use("/v1/book" ,bookRoutes)

//port : 8000
app.listen(8000, () => {
    console.log('Server is running on port 8000')
})