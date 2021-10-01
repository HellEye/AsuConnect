import express, { Application, Request, Response } from "express"
import connect from "./connect"
import Routes from "./Routes"

const app: Application = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
	res.send("TS App is running")
})

const PORT = process.env.PORT || "wrong env port"
const db = process.env.MONGO_URL || "wrong env url"

connect({ db })

Routes(app)

app.listen(PORT, () => {
	console.log(`Express is listening on port ${PORT}`)
})

console.log(
	app._router.stack.map((r: any) => {
		if (!r.route) return "Empty"
		const method = Object.keys(r.route.methods)[0]
		return `${method}:${r.route.path}`
	})
)

/** TODO
 * user_class
 * classes
 * user_cards
 * cards
 * items
 * item_sales
 *
 * */
