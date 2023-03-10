const { nanoid } = require('nanoid');

function checkUrlExists(data, url) {
    if (data && url) {
        const existedUrlObj = data.find(obj => obj.longUrl === url)
        if (existedUrlObj) {
            return existedUrlObj
        }
    }
}
function checkShortUrlCodeExists(data, shortUrlCode) {
    if (data && shortUrlCode) {
        const existedUrlObj = data.find(obj => obj.urlCode === shortUrlCode);
        if (existedUrlObj) {
            return existedUrlObj;
        };
    }
}
function createUrlObject(longUrl, shortCode) {
    return {
        longUrl,
        urlCode: shortCode,
        shortUrl: `http://localhost:3000/${shortCode}`
    }
}
function createShortUrlCode() {
    return nanoid(9);
}

module.exports = {
    checkUrlExists,
    createShortUrlCode,
    checkShortUrlCodeExists,
    createUrlObject
};