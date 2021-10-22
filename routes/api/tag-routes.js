const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(allTags)
  } catch (error) {
    res.status(500).json(error)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    if (!oneTag) {
      res.status(404).json({message: 'There is no tag with this ID'})

    } else {

      res.status(200).json(oneTag)
    }
  } catch (error) {
    res.status(500).json(error)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    if (!req.body.length) {
      await Tag.create(req.body)
      res.status(200).json({ message: "You have successfully inserted a tag" })
    } else if (req.body.length === 1) {
      await Tag.create(req.body[0])
      res.status(200).json({ message: "You have successfully inserted a tag" })
    } else {
      await Tag.bulkCreate(req.body)
      res.status(200).json({ message: "You have successfully inserted tags" })
    }
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    const updatedTag = await Tag.findByPk(req.params.id)
    res.status(200).json({message: `You have updated ${updatedTag.tagName}`})
  }
  catch (error) {
    res.status(500).json(error)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    const deletedTag = await Tag.findByPk(req.params.id)

    res.status(200).json({message: `You have deleted the tag ${deletedTag.tagName}`})
  }
  catch(error) {
    res.status(500).json(error)
  }
});

module.exports = router;
