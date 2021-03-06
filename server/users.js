'use strict'

const db = require('APP/db')
const User = db.model('users')

const {mustBeLoggedIn, forbidden, selfOnly} = require('./auth.filters')

module.exports = require('express').Router()
  .param('id', (req, res, next, id) => {
    User.findById(id)
    .then(user => {
      if(!user) {
        res.sendStatus(404);
      } else {
        req.foundUser = user;
        next();
      }
    })
    .catch(next)
  })
  .get('/',
    // The forbidden middleware will fail *all* requests to list users.
    // Remove it if you want to allow anyone to list all users on the site.
    //
    // If you want to only let admins list all the users, then you'll
    // have to add a role column to the users table to support
    // the concept of admin users.
    forbidden('listing users is not allowed'),
    (req, res, next) =>
      User.findAll()
        .then(users => res.json(users))
        .catch(next))
  .post('/',
    forbidden('adding users is not allowed'),
    (req, res, next) =>
      User.findOrCreate(req.body)
      .then(user => res.json(user))
      .catch(next))
  .get('/:id', (req, res, next) => res.json(req.foundUser))
  .put('/:id',
    selfOnly,
    (req, res, next) =>
      req.foundUser.updateAttributes(req.body)
      .spread((count, rows) => res.status(count ? 200 : 400).send())
      .catch(next))
  .delete('/:id',
    forbidden('deleting users is not allowed'),
    (req, res, next) =>
      req.foundUser.destroy()
      .then(success => res.status(success ? 200 : 400).send())
      .catch(next))
  // MIGHT NEED TO CASCADE OUR DELETE
  .get('/:id/orders',
    (req, res, next) =>
      req.foundUser.getOrders()
      .then(orders => res.json(orders))
      .catch(next))
  .get('/:id/reviews',
    (req, res, next) =>
      req.foundUser.getReviews()
      .then(reviews => res.json(reviews))
      .catch(next))
  .post('/:id/reviews',   // might need to auth people who actually bought product
    // selfOnly,
    (req, res, next) => 
      req.foundUser.createReview(req.body)   // req.body should have the product_id and all other review fields
      .then(createdReview => res.json(createdReview))
      .catch(next))
  .get('/:id/orders/:orderId', 
    (req, res, next) => 
      req.foundUser.getOrders({where: {id: req.params.orderId}})
      .then(order => [order, order[0].getOrderItems()])
      .spread((order, orderItems) => res.json({order:order[0], orderItems}))
      .catch(next))

