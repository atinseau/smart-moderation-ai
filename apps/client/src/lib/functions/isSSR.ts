

export function isSSR(): boolean {
  return typeof global.window === "undefined"
}
