const mCats  = require('./features/models/category.model')
const mPages = require('./features/models/post_pages.model')

exports.getDetails = async (req, res, next) => {

  const { body, query, params } = req;
  const slug = body.slug || query.slug || params.slug

  let data = {}

  const cats = await mCats.find()

  const queryPage = {
    slug:slug
  }
  const page = await mPages.findOne(queryPage)

  data['page'] = mPages.parse(page)
  data['cats'] = cats.map(mCats.parseSimple)

  res.render('page_details', data);
}

