
const model = require('../features/models/category.model')
const mPages = require('../features/models/post_pages.model')

exports.getList = async (req, res, next) => {

  let data = {}

  const cats = await model.find()

  data['cats'] = cats.map(model.parse)

  res.render('admin_category_list', data);
}

exports.getDetails = async (req, res, next) => {

  const { body, query, params } = req;
  const id = body.id || query.id || params.id

  let data = {}

  const cat = await model.findById(id)
  const queryPages = {
    _id: {
      $in: cat.pages || []
    }
  }
  const pages = await mPages.find(queryPages)

  data['cat'] = model.parse(cat)
  data['pages'] = pages.map(mPages.parseSimple)

  res.render('admin_category_details', data);
}

exports.create = async (req, res, next) => {

  const { body } = req;

  const nItem = model.createData(body)

  nItem.save().then((pageData) => {

    exports.getList(req, res, next)

  }).catch((error) => {
    console.error(error)
    res.render('admin_error_page', error);
  })

}

exports.edit = async (req, res, next) => {

  const { body, query, params } = req;
  const id = body.id || query.id || params.id

  let cat = await model.findById(id)
  if (!cat) {
    const error = {
      message: "NOT FOUND"
    }
    return res.render('admin_error_page', error);
  }

  cat = model.updateData(body, cat)
  cat.save().then((pageData) => {

    exports.getList(req, res, next)

  }).catch((error) => {
    console.error(error)
    res.render('admin_error_page', error);
  })
}

exports.delete = async (req, res, next) => {

  const { body, query, params } = req;
  const id = body.id || query.id || params.id

  let cat = await model.findById(id)
  if (!cat) {
    const error = {
      message: "NOT FOUND"
    }
    return res.render('admin_error_page', error);
  }

  model.deleteOne({ _id: id }).then((pageData) => {

    exports.getList(req, res, next)

  }).catch((error) => {
    console.error(error)
    res.render('admin_error_page', error);
  })
}