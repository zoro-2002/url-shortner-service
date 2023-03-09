const { nanoid } = require('nanoid');

function checkUrlExists(data, url) {
    if (data && url) {
        const existedUrlObj = data.find(obj => obj.longUrl === url)
        if (existedUrlObj) {
            return {
                message: "this url already exists",
                ...existedUrlObj
            }
        }
        return;
    }
}
function checkShortUrlCodeExists(data, shortUrlCode) {
    if (data && shortUrlCode) {
        const existedUrlObj = data.find(obj => obj.urlCode === shortUrlCode);
        if (existedUrlObj) {
            return existedUrlObj;
        };
        return;
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