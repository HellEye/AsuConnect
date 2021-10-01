import { Model, Document, Query, EnforceDocument } from "mongoose"
import { Nullable } from "../Types/common"

type GenFunctionPlaceholder = () => never
type OutQuery<D extends Document> = Query<D, D> | Query<D[], D> | Query<any, D>
export type GeneratorInput<D extends Document> = {
	findObj?: Partial<D>
	data?: Partial<D> | Partial<D>[]
}

type GenFunctionBase<D extends Document> = ({
	findObj,
	data,
}: GeneratorInput<D>) => OutQuery<D>

type GenFunction<D extends Document> = GenFunctionBase<D> &
	GenFunctionPlaceholder

export type Method = "get" | "put" | "post" | "delete"

type GenFunctionWithMethod<D extends Document> = {
	func: GenFunction<D>
	method: Method
}

export type GenFunctionDict<D extends Document> = {
	[key: string]: GenFunctionWithMethod<D>
}
export type ControllerOut<D extends Document> = {
	controllers: GenFunctionDict<D>
	model: Model<D>
}
type GenCrudFinish<D extends Document> = () => ControllerOut<D>
type GenCrudOne<D extends Document> = (
	opTypes: string,
	key?: string
) => GenCrudReturnOne<D>
type GenCrudMany<D extends Document> = (
	opTypes: string,
	key?: string
) => GenCrudReturnMany<D>
type GenCrudKey<D extends Document> = (key: string) => GenCrudReturnKey<D>

type GenCrudReturnKey<D extends Document> = {
	finish: GenCrudFinish<D>
	one: GenCrudOne<D>
	many: GenCrudMany<D>
}
type GenCrudReturnOne<D extends Document> = {
	finish: GenCrudFinish<D>
	many: GenCrudMany<D>
	key: GenCrudKey<D>
}
type GenCrudReturnMany<D extends Document> = {
	finish: GenCrudFinish<D>
	one: GenCrudOne<D>
	key: GenCrudKey<D>
}
type GetCrudReturn<D extends Document> = {
	key: GenCrudKey<D>
	many: GenCrudMany<D>
}

const generators: { [key: string]: any } = {
	getOne:
		<D extends Document>(model: Model<D>, key: string) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.findOne(findObj as any)
		},
	getMany:
		<D extends Document>(model: Model<D>, key: string) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.find(findObj as any)
		},

	insertOne:
		<D extends Document>(model: Model<D>) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.create(data)
		},
	insertMany:
		<D extends Document>(model: Model<D>) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.insertMany(data as any)
		},

	updateOne:
		<D extends Document>(model: Model<D>, key: string) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) =>
			model.findOneAndUpdate(findObj as any, data as any, {
				new: true,
			}),

	updateMany:
		<D extends Document>(model: Model<D>, key: string) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) =>
			model.updateMany(findObj as any, data as any, {
				new: true,
			}),

	deleteOne:
		<D extends Document>(model: Model<D>, key: string) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) =>
			model.findOneAndDelete(findObj as any),
	deleteMany: <D extends Document>(model: Model<D>, key: string) => {
		console.warn(
			`You've just generated a deleteMany function for ${model.name}`
		)
		console.warn("WARNING, this wrecks stuff if not handled with care!")
		return ({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.deleteMany(findObj as any)
		}
	},
	getAll:
		<D extends Document>(model: Model<D>) =>
		({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.find({})
		},
	deleteAll: <D extends Document>(model: Model<D>) => {
		console.warn(`You've just generated a deleteAll function for ${model.name}`)
		console.warn(
			"!!!!!WARNING, this really wrecks stuff if not used just for debugging/testing!"
		)
		return ({ findObj = {}, data = {} }: GeneratorInput<D>) => {
			return model.deleteMany({})
		}
	},
}

const getOpKey = (operation: string, many: boolean, key?: string) => {
	if (!key) return `${operation}${many ? "Many" : "One"}`
	return `${operation}${
		many ? "Many" : "One"
	}By${key[0].toUpperCase()}${key.slice(1)}`
}
const getEmptyOutObj = <D extends Document>(): GenFunctionWithMethod<D> => {
	return {
		func: () => {
			throw Error(
				"whoopsie, we made a fucky wucky and didn't override this function"
			)
		},
		method: "get",
	}
}
const getOpTypesWithKey = <D extends Document>(
	opTypes: string,
	key: string,
	model: Model<D>,
	many: boolean
): GenFunctionDict<D> => {
	const out: GenFunctionDict<D> = {}
	if (opTypes.indexOf("r") > -1) {
		const opKey = getOpKey("get", many, key)
		out[opKey] = getEmptyOutObj<D>()
		out[opKey].func = generators[`get${many ? "Many" : "One"}`](model, key)
		out[opKey].method = "get"
	}
	if (opTypes.indexOf("u") > -1) {
		const opKey = getOpKey("update", many, key)
		out[opKey] = getEmptyOutObj<D>()
		out[opKey].func = generators[`update${many ? "Many" : "One"}`](model, key)
		out[opKey].method = "put"
	}
	if (opTypes.indexOf("d") > -1) {
		const opKey = getOpKey("delete", many, key)
		out[opKey] = getEmptyOutObj<D>()
		out[opKey].func = generators[`delete${many ? "Many" : "One"}`](model, key)
		out[opKey].method = "delete"
	}
	return out
}

const getOpTypesGlobal = <D extends Document>(
	opTypes: string,
	model: Model<D>,
	many: boolean
): GenFunctionDict<D> => {
	const out: GenFunctionDict<D> = {}
	if (opTypes.indexOf("r") > -1 && many) {
		out.getMany = getEmptyOutObj<D>()
		out.getMany.func = generators.getAll(model)
		out.getMany.method = "get"
	}
	if (opTypes.indexOf("c") > -1) {
		const opKey = getOpKey("insert", many)
		out[opKey] = getEmptyOutObj<D>()
		out[opKey].func = generators[`insert${many ? "Many" : "One"}`](model)
		out[opKey].method = "post"
	}
	if (opTypes.indexOf("d") > -1 && many) {
		out.deleteMany = getEmptyOutObj<D>()
		out.deleteMany.func = generators.deleteAll(model)
		out.deleteMany.method = "delete"
	}
	return out
}

const getCrud = <D extends Document>(model: Model<D>): GetCrudReturn<D> => {
	const done: GenFunctionDict<D> = {}
	const finish = () => {
		return {
			controllers: done,
			model,
		}
	}
	const one = (opTypes: string, key?: string): GenCrudReturnOne<D> => {
		const ops = key
			? getOpTypesWithKey(opTypes, key, model, false)
			: getOpTypesGlobal(opTypes, model, false)
		for (let op in ops) {
			done[op] = ops[op]
		}
		return {
			finish,
			many: key ? _manyWithKey(key) : many,
			key: getFromKey,
		}
	}
	const _oneWithKey =
		(key: string) =>
		(opTypes: string): GenCrudReturnOne<D> =>
			one(opTypes, key)
	const _manyWithKey =
		(key: string) =>
		(opTypes: string): GenCrudReturnMany<D> =>
			many(opTypes, key)

	const many = (opTypes: string, key?: string): GenCrudReturnMany<D> => {
		const ops = key
			? getOpTypesWithKey(opTypes, key, model, true)
			: getOpTypesGlobal(opTypes, model, true)
		for (let op in ops) {
			done[op] = ops[op]
		}

		return {
			finish,
			one: key ? _oneWithKey(key) : one,
			key: getFromKey,
		}
	}
	const getFromKey = (key: string): GenCrudReturnKey<D> => {
		return {
			one: _oneWithKey(key),
			many: _manyWithKey(key),
			finish,
		}
	}
	return {
		key: getFromKey,
		many,
	}
}

export { getCrud }
