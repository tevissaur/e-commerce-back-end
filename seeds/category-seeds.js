const { Category } = require('../models');

const categoryData = [
  {
    categoryName: "Shirts"
  },
  {
    categoryName: 'Shorts',
  },
  {
    categoryName: 'Music',
  },
  {
    categoryName: 'Hats',
  },
  {
    categoryName: 'Shoes',
  },
];

const seedCategories = () => Category.bulkCreate(categoryData);

// seedCategories().then(data => console.log(data))

module.exports = seedCategories;
