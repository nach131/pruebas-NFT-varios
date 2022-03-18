import axios from 'axios'

// const url = '/api/bored'
const url = 'https://tokemo.tk/api/bored/token/'

export const getAll = (ip) => {
  const request = axios.get(url + ip)
  return request.then(res => res.data)
}
