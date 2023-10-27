const express = require('express');
const app = express();
const cors = require("cors");
const port = 6000;
// const client = require('./database/connection');
const userRouter = require('./routes/user');
const customerTaxCommentsRouter = require('./routes/customerTaxComments')
const customerTaxDocumentsRouter = require('./routes/customerTaxDocuments')
const customerTaxInputs = require('./routes/customerTaxInputs')
const taxInputs = require('./routes/taxInputs')
const taxDocuments = require('./routes/taxDocuments')

app.use(express.json());

app.use(cors());

// Error handling middleware with the `err` parameter
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", success: false });
    next()
});

// Mount the user router
app.use('/user', userRouter);

// Mount the customer tax comment router
app.use('/customer-tax-comment', customerTaxCommentsRouter)

// Mount the customer tax comment router
app.use('/customer-tax-document', customerTaxDocumentsRouter)

// Mount the customer tax inputs
app.use('/customer-tax-inputs', customerTaxInputs)

// Mount the tax inputs
app.use('/tax-inputs', taxInputs)

//Mount the tax documents
app.use('/tax-documents', taxDocuments)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


