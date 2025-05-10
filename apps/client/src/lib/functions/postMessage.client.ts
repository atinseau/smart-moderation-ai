export const postMessage = (name: string, data?: any) => {
  window.opener?.postMessage(JSON.stringify({
    name,
    data,
  }), window.location.origin)
}
