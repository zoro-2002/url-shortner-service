const chai = require("chai")
const expect = chai.expect
const request = require("supertest")
const { app } = require("../server")

describe("POST /shorten", () => {
	it("should return 200 OK with short URL object when given a valid long URL", (done) => {
		const longUrl = "https://www.example.com"
		request(app)
			.post("/shorten")
			.send({ url: longUrl })
			.expect(200)
			.end((err, res) => {
				if (err) return done(err)
				expect(res.body).to.have.property("longUrl", longUrl)
				expect(res.body).to.have.property("urlCode")
				done()
			})
	})

	it("should return 400 Bad Request when not given a long URL", (done) => {
		request(app).post("/shorten").expect(400, done)
	})

	it("should return 400 Bad Request when given an invalid long URL", (done) => {
		const longUrl = "not a valid URL"
		request(app).post("/shorten").send({ url: longUrl }).expect(400, done)
	})
})

describe("GET /:shortUrlCode", () => {
	it("should 301 and redirect to long URL", (done) => {
        const shortUrlCode = "Fd7DvDGcy";
        const longUrl = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/400";
		request(app)
			.get(`/${shortUrlCode}`)
			.expect(301)
			.end((err, res) => {
				if (err) return done(err)
				expect('Location', longUrl)
				done()
			})
	})
    it("should return 400 Bad Request when given invalid short url code", (done) => {
		request(app).post("/shorten").expect(400, done)
	})
})
