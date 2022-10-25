
const mCats = require('./features/models/category.model')
const mPages = require('./features/models/post_pages.model')

exports.getHome = async (req, res, next) => {
  const { body, query, params } = req
  let { page = 1, limit = process.env.ITEMS_PAGE } = query
  if (limit <= 0) limit = process.env.ITEMS_PAGE

  let data = {}

  const cats = await mCats.find()

  const queryPage = {
    published_at: {
      $gte: new Date()
    }
  }

  const options = {
    page : page,
    limit: limit,
    sort : [['published_at', -1]]
  }

  let pages = await mPages.paginate(queryPage, options)

  data['cats']  = cats.map(mCats.parseSimple)
  data['pages'] = (pages.docs||[]).map(mPages.parseSimple)

  res.render('home', data);

}

