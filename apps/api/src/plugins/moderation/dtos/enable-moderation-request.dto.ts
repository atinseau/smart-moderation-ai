import { t } from "elysia"

export const enableModerationRequestDto = t.Object({
  ids: t.Array(t.String())
})
