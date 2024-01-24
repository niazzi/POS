// app.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Add this line
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const itemRoutes = require('./routes/ItemRoute');
const salePaymentRoutes = require('./routes/SalePayment')
const customerRoutes = require('./routes/Customer');
const refundRoutes = require('./routes/Refund')
const supplierRoutes = require('./routes/Supplier');
const storeRoutes = require('./routes/settings/Store');
const categoryRouter = require('./routes/items/Categories');


const app = express();
const port = 4000;

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/APOS', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/APOS', {
  // useNewUrlParser has no effect since Node.js Driver version 4.0.0
  // useUnifiedTopology has no effect since Node.js Driver version 4.0.0
});

// Check for MongoDB connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set a larger limit for request payload
app.use(bodyParser.json({ limit: '50mb' }));
// Middleware to parse JSON
app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// Serve static files from the 'public' folder
app.use('/public', express.static(path.join(__dirname, 'public')));


// Use item routes
app.use('/api', itemRoutes);
app.use('/api',salePaymentRoutes);
app.use('/api', customerRoutes);
app.use('/api', refundRoutes);
app.use('/api', supplierRoutes);
app.use('/api', storeRoutes);
app.use('/api', categoryRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
