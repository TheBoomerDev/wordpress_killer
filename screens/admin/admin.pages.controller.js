
const mCats = require('../features/models/category.model')
const model = require('../features/models/post_pages.model')

exports.getList = async (req, res, next) => {

  let data = {}

  const items = await model.find()

  data['items'] = items.map(model.parse)

  res.render('admin_pages_list', data);
}

exports.getDetails = async (req, res, next) => {

  const { body, query, params } = req;
  const id = body.id || query.id || params.id

  let data = {}

  const page    = await model.findById(id)
  data ['page'] = model.parse(page)

  res.render('admin_pages_details', data);
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

  let item = await model.findById(id)
  if (!item) {
    const error = {
      message: "NOT FOUND"
    }
    return res.render('admin_error_page', error);
  }

  item = model.updateData(body, item)
  item.save().then((pageData) => {

    exports.getList(req, res, next)

  }).catch((error) => {
    console.error(error)
    res.render('admin_error_page', error);
  })
}

exports.delete = async (req, res, next) => {

  const { body, query, params } = req;
  const id = body.id || query.id || params.id

  let item = await model.findById(id)
  if (!item) {
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