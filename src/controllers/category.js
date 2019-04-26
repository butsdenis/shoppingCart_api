const Category = require('../models/category')

exports.addCategory = async (req, res) => {
  const category = new Category({
    ...req.body
  })

  try {
    const categories = await Category.findOne({ name: req.body.name })
    if(categories) {
      throw new Error('Category exist')
    }

    await category.save()
    res.status(201).send(category)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }

}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.send(categories)
  } catch (e) {
    return res.status(500).send({ error: e.message })
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const product = await Category.findOne({ _id: req.params.id })
    res.send(product)
  } catch (e) {
    return res.status(500).send({error: e.message})
  }
}

exports.editCategory = async (req, res) => {
  
  try {
    const category = await Category.findOneAndUpdate({ _id: req.params.id }, req.body, {new: true})

    if (!category) {
      return res.status(404).send()
    }
  
    await category.save()
    res.send(category)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.deleteCategories = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({ _id: req.params.id })

    if (!category) {
      res.status(404).send()
    }

    res.send(category)
  } catch (e) {
    res.status(500).send({error: e.message})
  }
}