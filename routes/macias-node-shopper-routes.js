/*
============================================
 Title: macias-node-shopper-routes.js
 Author: Andres Macias
 Date:   9/25/22
 Description: node shopper API - routes for node-shopper
===========================================
*/

let express = require('express');
let router = express.Router();
let Customer = require('../models/macias-customer');


/**
* @openapi
* /api/customers:
*   post:
*       summary: Creates a new customer object
*       Description: Api for adding customer object
*       operationId: createCustomer
*       requestBody:
*               description: Customers information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - firstName
*                               - lastName
*                               - userName
*                           properties:
*                               firstName:
*                                   type: string
*                               lastName:
*                                   type: string
*                               userName:
*                                   type: string
*       responses:
*           '200':
*               description: Customer added to MongoDB
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/customers', async (req, res) => {
    try {
        let newCustomer = {
            firstName: "Brady",
            lastName: "Williams",
            userName: "Bwilliams",
        };

        await Customer.create(newCustomer, function (err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(customer)
                res.json(customer);
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

/**
* @openapi
* /api/customers/:username/invoices:
*   post:
*       summary: Adds an invoice using the username of the customer
*       Description: Api for adding an invoice to a customer by using the username
*       operationId: createInvoiceByUserName
*       parameters:
*           - name: username
*             description: The username requested
*             in: path
*             schema:
*               type: string
*       requestBody:
*               description: invoice information
*               content:
*                   application/json:
*                       schema:
*                           required:
*                               - subtotal
*                               - tax
*                               - dateCreated
*                               - dateShipped
*                               - lineItems
*                           properties:
*                               subtotal:
*                                   type: string
*                               tax:
*                                   type: string
*                               dateCreated:
*                                   type: string
*                               dateShipped:
*                                   type: string
*                               lineItems:
*                                   type: array
*                                   items:
*                                       type: object
*                                       properties:
*                                           name:
*                                               type: string
*                                           price:
*                                               type: number
*                                           quantity:
*                                               type: number
*       responses:
*           '200':
*               description: Customer added to MongoDB
*           '500':
*               description: Server Exception
*           '501':
*               description: MongoDB Exception
*/
router.post('/customers/:username/invoices', function (req, res) {
    try {
        Customer.findOne({ userName: "Tsmith" }, async (err, customer) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(customer);
                res.json(customer.invoices);
                let newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    dateShipped: req.body.dateShipped,
                    lineItems: [
                        {
                            name: req.body.name,
                            price: req.body.price,
                            quantity: req.body.quantity
                        }
                    ]
                };
                customer.invoices.push(newInvoice);
                customer.save();
            };
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

/**
* @openapi
* /api/customers/:username/invoices:
*   get:
*       summary: returns a list of a persons invoices
*       description: API for finding all the invoices for a user
*       operationId: findAllInvoicesByUserName
*       parameters:
*           - name: username
*             description: The username requested
*             in: path
*             schema:
*               type: string
*       responses:
*         '200':
*           description: Customer added to MongoDB
*         '500':
*           description: Server Exception
*         '501':
*           description: MongoDB Exception
*/
router.get('/customers/:username/invoices', async (req, res) => {
    try {
        Customer.findOne({ userName: "Tsmith" }, function (err, customer) {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                });
            } else {
                console.log(customer.invoices);
                res.json(customer.invoices);
            };
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            'message': `Server Exception: ${error.message}`
        });
    };
});

module.exports = router;