const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const serviceRoutes = require('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes);
const blogRouter = require("./routes/blogRoutes");
app.use("/api/blogs", blogRouter);

app.get('/', (req, res) => {
  res.json({ message: 'API is working!' });
});


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
