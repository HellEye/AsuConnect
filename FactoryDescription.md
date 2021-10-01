# Requirements

1. Generate a boilerplate rest api based on schema/model
2. Ability to override specific methods for additional functionality
   1. This means some logical naming for specific paths before their creation
   2. Prefferably make the override as boilerplate-free as possible

<br>

# How do we get there

1. Read user requirements for specific actions
   1. Simple factory - style api
   2. Returning a list of desired actions
      - Either return actual db acess functions or objects that describe them (both?)
2. Create functions for creating routes using those actions
   1. using the descriptors for api route, generate a dictionary of callable functions that would register a route
3. Give the ability to override functions
   1. using a known path and method type, give the ability to insert extra steps into the query, or to rewrite the query completely
      - Should be simple to use in any capacity you want
      - no extra `then()`s or `catch()`es
        - means probably returning another function, maybe even two
4. Call all functions to register actions in the global app object

# Details

### 1.1

I feel like this could be basically a cleaner version of controllerFactory, without all the generator nonsense, just returning objects...

```typescript
getCrud = () => {
	const out = {
		basePath,
		model,
		//maybe other things

		// this is generated
		objects: [
			{
				method: "get",
				path: "/:id",
			},
			{
				method: "get",
				path: "/",
				allowedQueryParams: ["name", "email"],
				many: true,
			},
		],
	}
}
```

### 3.1

I see it as something like

```typescript

  storage:{} = {}

  defaultFunc = ()=>{

    // prolly a foreach element in list provided by generator from 1
    const apiPath = "..."
    const method = "..."
    //          get:/api/user
    if(!storage.apiPath)
      storage[apiPath]={}://some type that has get put post delete as keys
    storage[apiPath][method] = (req, res, obj={})=>{
      const params = {
        // some magic with req object to get queryParams out
        //// also probably some logic to figure out any singular params
        //// if we'll even go there
        ///// we probably will cuz it's a good way to do it
      }
      return {
        ...obj,
        method:method,
        apiPath:apiPath,
        dbFunc:"find",
        params,
        extra:[ // in actual implementation this will be empty but here it's an example of what an override would look like
          {
            dbFunc:"sort",
            params:{key:"desc"}
          }
        ],
        then:(data)=>res.send(data)
        catch:(e)=>res.status(500).send(e)
      }
    }

  }
  override = (name, )=>{

  }
```
