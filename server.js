const express = require("express")
const app = express()

const PORT = process.env.PORT || 3000

const bodyParser = require("body-parser")
const validUrl = require("valid-url")

const { readJsonFile, writeJsonFile } = require("./helpers/fileUtils")
const { checkUrlExists, createShortUrlCode, checkShortUrlCodeExists, createUrlObject } = require("./helpers/helpers.js")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post("/shorten", async function (req, res) {
	try {
		let longUrl = req.body.url
		if (!longUrl) return res.status(400).json("badrequest")
		if (!validUrl.isUri(longUrl)) return res.status(400).json("not a valid url")
		const data = await readJsonFile(`${__dirname}/public/data.json`)
		const urlExists = checkUrlExists(data, longUrl)
		if (!urlExists) {
			try {
				let shortCode = createShortUrlCode()
				const newUrlObj = createUrlObject(longUrl, shortCode)
				res.status(200).json(newUrlObj)
				data.push(newUrlObj)
				await writeJsonFile(`${__dirname}/public/data.json`, data)
				return
			} catch (err) {
				console.error(err)
				return res.status(500).json({ message: "something went Wrong, try again" })
			}
		}
		res.status(200).json(urlExists)
	} catch (err) {
		return res.status(500).json("internal Server Error: " + err.message)
	}
})

app.get("/:shortUrlCode", async function (req, res) {
	try {
		const shortUrlCode = req.params.shortUrlCode
		if (!shortUrlCode) return res.status(400).json("badRequest")
		const data = await readJsonFile(`${__dirname}/public/data.json`)
		const urlExits = checkShortUrlCodeExists(data, shortUrlCode)
		if (!urlExits) return res.status(404).json("invalid urlCode")
		res.redirect(301, urlExits.longUrl)
	} catch (err) {
		return res.status(500).json("internal Server Error: " + err.message)
	}
})

app.listen(PORT, () => console.log(`server started, listening PORT ${PORT}`))

module.exports = { app }
