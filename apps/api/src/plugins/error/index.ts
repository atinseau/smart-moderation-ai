import Elysia from "elysia";



export default new Elysia({ name: "errorPlugin" })
  .onError(({ error, code }) => {
    if (error instanceof Error) {
      console.error(error);
      return {
        message: error.message,
        code
      }
    }
  })
  .as('scoped')
