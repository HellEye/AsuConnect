import express, { Application, Request, Response } from "express"
import connect from "./connect"
import Routes from "./Routes"

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

console.log(app._router.stack.map((v: any) => v?.route))

/** TODO
 * user_class
 * classes
 * user_cards
 * cards
 * items
 * item_sales
 *
 * */
