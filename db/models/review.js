'use strict';

const {STRING, INTEGER, TEXT} = require('sequelize');

module.exports = db => db.define('reviews', {
  title: {
    type: STRING,
    allowNull: false,
  },
  text: {
    type: TEXT,
    allowNull: false,
    validate: {
      minLength: function(value) {
        if (value.length < 20) {
          throw new Error('Review must have at least 20 characters');
        }
      }
    }
  },
  rating: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5
    }
  }
}, {
  // defaultScope: {
  //   include: {
  //     all: true
  //   }
  // }
});

module.exports.associations = (Review, {User, Product}) => {
  Review.belongsTo(User, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
  Review.belongsTo(Product, {foreignKey: {allowNull: false}, onDelete: 'CASCADE'});
  // Review.addScope('defaultScope', {include: [ User ]}, {override: true});
};
