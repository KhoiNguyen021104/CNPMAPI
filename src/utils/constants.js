// các host đc phép truy cập vào host của BE
export const WHITELIST_DOMAINS = [
  'http://localhost:5173',
  'http://localhost:5174',
]


export const ACTION_MODEL = {
  actionCart: {
    quantity: {
      inc: 'inc',
      dec: 'dec'
    }
  }
}