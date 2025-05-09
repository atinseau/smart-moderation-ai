import Elysia, { t } from "elysia";


export const facebookPlugin = new Elysia({ prefix: "/facebook" })
  .post('/auth', ({ body }) => {
    console.log(body.token)
    return {
      status: 200,
      message: "okqsdqsd"
    }
  }, {
    body: t.Object({
      token: t.String()
    })
  })
