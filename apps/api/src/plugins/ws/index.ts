import Elysia from "elysia";


export default new Elysia()
  .ws('/ws', {
    open: (ws) => {
      ws.subscribe('broadcast')
    },
  })
