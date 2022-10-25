const mongoose         = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')
const Schema           = mongoose.Schema;
const tools            = require('../common/tools')

const params = { timestamps: true, strict: false, strictPopulate: false }
const schema = {
    slug       : { type: String},
    name       : { type: String},
    pages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post_pages'
    }]

}

const dbSchema = new Schema(schema, params);
dbSchema.pre("save", function(next) {
    this.slug = tools.slugify(this.title || '_')
    next();
});
dbSchema.plugin(mongoosePaginate);
let model = mongoose.model('categories', dbSchema)

model.updateData = (newData, oldData) => {
    let keys = Object.keys(newData)
    const avoid = ['_id', 'createdAt', 'updatedAt', '__v']
    keys = keys.filter(key => {
        return !tools.containsInArray(key, avoid)
    })

    keys.forEach(key => {
        const value = newData[key]
        if (value === null || value === undefined || value === '') {
            return
        }
        oldData[key] = newData[key]
    })

    return oldData

}

model.createData = (obj) => {
    let item = new model()
    return model.updateData(obj, item)
}

model.parse = (item) => {
    const avoid = ['__v']
    item = tools.parseItems(avoid, item)
    return item
}

model.parseSimple = (item) => {
    const avoid = ['__v', 'pages', '_id']
    item = tools.parseItems(avoid, item)
    return item
}

model.parseListItem = (item) => {
    const avoid = ['__v', 'body']
    obj = tools.parseItems(avoid, item)
    return obj
}

model.parseList = (items=[]) => {
    return items.map(parseListItem)
}

module.exports = model