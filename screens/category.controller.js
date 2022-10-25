const mCats  = require('./features/models/category.model')
const mPages = require('./features/models/post_pages.model')

exports.getList = async (req, res, next) => {

  let cats = await mCats.find()
  cats = cats.map(mCats.parseSimple)

  const data = {
    cats
  }
  res.render('category_list', data);
}

exports.getDetails = async (req, res, next) => {

  const {body, query, params} = req
  const slug = body.slug || query.slug || params.slug

  const queryCat = {
    slug: slug
  }
  const cat = await mCats.find(queryCat)

  const queryPages = {
    _id: {
      $in: cat.pages || []
    }
  }
  let pages = await mPages.find(queryPages)

  let data = {}

  data['cat']   = mCats.parse(cat)
  data['pages'] = pages.map(mPages.parseSimple)

  res.render('category_detail', data);
}

