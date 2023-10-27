const express = require('express');
const { authenticate } = require('../middlewares/middleware');
const router = express.Router();

const { createCustomerNewTaxDocument, getCustomerAllDocuments, getCustomerDocumentById, updateCustomerDocument, deleteCustomerDocumentById } = require('../controllers/customerTaxDocuments')


router.post('/create', createCustomerNewTaxDocument)

router.get('/', getCustomerAllDocuments)

router.route('/:id')
    .get(getCustomerDocumentById)
    .put(updateCustomerDocument)
    .delete(deleteCustomerDocumentById)


module.exports = router
