import mongoose from "mongoose"

export default ( db : string) => {
	const connect = () => {
		mongoose
			.connect(db)
			.then(() => {
				return console.info(`Connected to ${db}`)
			})
			.catch((err) => {
				console.error(`error connecting to ${db}: `, err)
				return process.exit(1)
			})
	}

	connect()

	mongoose.connection.on("disconnected", connect)
}
