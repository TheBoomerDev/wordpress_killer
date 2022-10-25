const slug        = require('slug')
const moment      = require('moment')
const handlebars  = require('handlebars');
const { dirname } = require('path');


exports.getTemplate = (templateName) => {

    const fs     = require('fs');
    const path   = require('path')

    const appDir = dirname(require.main.filename);
    const dirPath = path.join(appDir, 'views')
    const filePath = dirPath+'/'+templateName
    console.log('File', filePath)
    const source = fs.readFileSync(filePath+".hbs", 'utf-8');
    const template = handlebars.compile(source);
    return template;
}

exports.parseItems =  (avoid = [], obj = {}) => {

    obj = JSON.parse(JSON.stringify(obj));

    let data = {}

    const keys = Object.keys(obj||{});
    keys.forEach(key => {
        if (exports.containsInArray(key, avoid)) return
        const value = obj[key]
        if (typeof true === 'boolean') {
            data[key] = value
            return
        }
        data[key] = value || ''
    })

    return data
}

exports.containsInArray = function (str, words) {
    if (!str || !words) return false
    return words.some(word => str.toLowerCase().includes(word.toLowerCase()));
}

exports.filterObj = (obj, avoid=[]) => {
    if (!obj) return {}
  obj = JSON.parse( JSON.stringify( obj ) );

  let data = {}

  avoid = ['updatedAt', '__v', ...avoid]
  const keys = Object.keys(obj);
  keys.forEach(key=>{
    if ( exports.containsInArray(key, avoid) ) return
    data[key] = obj[key] || ''
  })
  return data
}

exports.getDate = (date) => {
    return moment(date || '2020-01-01', process.env.DATE)
}

exports.getDateFormated = (date) => {
    return moment(date || '2020-01-01', process.env.DATE).format('YYYYMMDD')
}

exports.getDateLimit = (days, isFuture = true) => {
    days = parseInt(days, 10)
    let date = moment()
    if (isFuture) {
        date = date.add(days, 'days')
    } else {
        date = date.subtract(days, "days")
    }
    return date.format(process.env.DATE)
}

exports.fillImages = function (movie) {

    let bck = movie['backdrop_path']
    movie['backdrop_path'] = (!bck) ? '' : process.env.IMG_URL + bck
    movie['backdrop_path'] = movie['backdrop_path'].replace("'", "")
    let poster = movie['poster_path']
    movie['poster_path'] = (!poster) ? '' : process.env.IMG_URL + poster
    movie['poster_path'] = movie['poster_path'].replace("'", "")

    let video = movie['video']
    if (video) {
        const url = process.env.VIDEO_URL + video.key
        movie['video'] = url
    }

    let cast = movie['cast'] || []
    cast = cast.map(actor => {
        actor['profile_path'] = process.env.IMG_PROFILE_URL + actor['profile_path']
        return actor
    })

    let profile = movie['profile_path']
    if (profile) {
        movie['profile_path'] = process.env.IMG_PROFILE_URL_DETAIL + movie['profile_path']
    }

    return movie
}

exports.fillImageMovies = function (items = []) {

    return items.map(item => {
        return exports.fillImages(item)
    })
}

exports.fillImageProfile = function (images = []) {

    try {
        return images.map(image => {
            let path = image['file_path']
            image['file_path'] = process.env.IMG_PROFILE_URL_DETAIL + path
            return image
        })
    } catch (error) {
        return images
    }
}

exports.getRandom = (array = []) => {
    if (!array || array.length <= 0) return null
    return array[Math.floor(Math.random() * array.length)]
}

exports.appendObjects = function (obj1, obj2) {
    return {
        ...obj1,
        ...obj2
    }
}

exports.slugify = function (label = '') {
    return slug(label || '', '_', {
        locale: 'es'
    })
}

exports.initTools = function () {
    if (!String.prototype.format) {
        String.prototype.format = function (...args) {
            return this.replace(/(\{\d+\})/g, function (a) {
                return args[+(a.substr(1, a.length - 2)) || 0];
            });
        };
    }
}