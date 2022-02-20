import express from "express"
import reflectMetadata from "reflect-metadata/"
import cookieParser from "cookie-parser"
import { buildSchema } from "type-graphql"
import connect from "./connect"

import { resolvers, schemas } from "./graphql"
import { ApolloServer } from "apollo-server-express"
import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginLandingPageProductionDefault,
	ApolloServerPluginSchemaReporting,
} from "apollo-server-core"
const bootstrap = async () => {
	//Build schema
	// const schema = await buildSchema({
	// 	// resolvers,
	// 	// authChecker
	// })
	//init express
	const app = express()
	//apply express middleware
	app.use(cookieParser())
	app.get("/", async (req, res) => {
		res.json(schemas)
	})
	//create apollo server
	// const server = new ApolloServer({
	// 	// schema,
	// 	apollo: {
	// 		graphRef: "asuconnect",
	// 	},
	// 	context: (ctx) => {
	// 		return ctx
	// 	},
	// 	plugins: [
	// 		process.env.NODE_ENV === "production"
	// 			? ApolloServerPluginLandingPageProductionDefault()
	// 			: ApolloServerPluginLandingPageGraphQLPlayground(),
	// 		ApolloServerPluginSchemaReporting(),
	// 	],
	// })
	//start server
	// await server.start()
	//apply server middleware
	// server.applyMiddleware({ app })
	//connect to db
	connect(process.env.MONGO_URL || "")
	//listen
	const PORT = process.env.PORT 
	app.listen(PORT, () => {
		console.log(`App listening on port ${PORT}`)
	})
}

bootstrap()
