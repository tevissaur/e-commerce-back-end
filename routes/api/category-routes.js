const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allCategories)
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    if (!oneCategory) {
      res.status(404).json({ message: 'No product with this ID.' })
    } else {
      res.status(200).json(oneCategory)
    }
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new category
  console.log(req.body.length)
  try {
    if (!req.body.length) {
      await Category.create(req.body)
      res.status(200).json({ message: "You have successfully inserted a category" })
    } else if (req.body.length === 1) {

      await Category.create(req.body[0])
      res.status(200).json({ message: "You have successfully inserted a category" })
    }
    else {
      await Category.bulkCreate(req.body)
      res.status(200).json({ message: "You have successfully inserted categories" })

    }
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updatedCategory = await Category.findByPk(req.params.id)
    res.status(200).json({ message: `You have updated ${updatedCategory.categoryName} to ${req.body.categoryName}` })
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    
    res.status(200).json({ message: `You have deleted the category with the id of ${deletedCategory}` })
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
