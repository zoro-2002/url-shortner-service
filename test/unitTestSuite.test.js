const chai = require("chai")
const expect = chai.expect

const { checkUrlExists, checkShortUrlCodeExists } = require("../helpers/helpers")

const data = [
	{
		longUrl: "https://docs.google.com/document/d/1qWVtlgvaGhQsJeA-RpTbgmmgwiIzHemc6HKZEIC36Js/edit#",
		shortUrl: "https://localhost:3000/xyz1",
		urlCode: "xyz1",
	},
	{
		longUrl: "https://www.youtube.com/watch?v=OlsJcZyirx8",
		shortUrl: "https://localhost:3000/xyz2",
		urlCode: "xyz2",
	},
	{
		longUrl: "https://www.youtube.com/watch?v=EyIvuigqDoA",
		shortUrl: "https://localhost:3000/xyz3",
		urlCode: "xyz3",
	},
	{
		longUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
		urlCode: "Fd7DvDGcy",
		shortUrl: "http://localhost:3000/Fd7DvDGcy",
	},
	{
		longUrl: "https://stackoverflow.com/questions/57169793/error-err-require-esm-how-to-use-es6-modules-in-node-12",
		urlCode: "jDzcpwGyQ",
		shortUrl: "http://localhost:3000/jDzcpwGyQ",
	},
	{
		longUrl: "https://www.npmjs.com/package/valid-url",
		urlCode: "4WkR579Tj",
		shortUrl: "http://localhost:3000/4WkR579Tj",
	},
	{
		longUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
		urlCode: "6OqYdK0gC",
		shortUrl: "http://localhost:3000/6OqYdK0gC",
	},
	{
		longUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
		urlCode: "xqz66xD91",
		shortUrl: "http://localhost:3000/xqz66xD91",
	},
	{
		longUrl: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400",
		urlCode: "RjeGMh5RJ",
		shortUrl: "http://localhost:3000/RjeGMh5RJ",
	},
]

describe("helpers unit tests", function () {
	const longUrl =  "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400";
	it("test 1 : should return object", function () {
		const result = checkUrlExists(data,longUrl)
		// expect(result).to.have.property("message").that.is.a("string")
		expect(result).to.have.property("longUrl",longUrl).that.is.a("string")
		expect(result).to.have.property("shortUrl").that.is.a("string")
		expect(result).to.have.property("urlCode").that.is.a("string")
	})
	it("test 2 : should return undefined", function () {
		const result = checkUrlExists(data,"https://developer.mozilla.org/en-US/d")
		expect(result).to.equal(undefined);
	})
	it("test 3 : should return object", function () {
		const result = checkShortUrlCodeExists(data, "Fd7DvDGcy")
		expect(result).to.have.property("longUrl").that.is.a("string")
		expect(result).to.have.property("shortUrl").that.is.a("string")
		expect(result).to.have.property("urlCode","Fd7DvDGcy").that.is.a("string")
	})
	it("test 4 : should return undefined", function () {
		const result = checkShortUrlCodeExists(data, "Fd7DvDGc")
		expect(result).to.equal(undefined);
	})
})
