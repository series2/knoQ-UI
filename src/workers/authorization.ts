import axios, { AxiosPromise } from 'axios'

const baseURL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000/api' : '/api'
const traQAPIBaseURL = 'https://q.trap.jp/api/1.0'

const authAPI = axios.create({
  baseURL,
})

interface AuthParams {
  state: string
  codeChallenge: string
  clientId: string
}

export const fetchAuthParams = (): AxiosPromise<AuthParams> => {
  return authAPI.post('/authParams')
}

export const calcAuthEndPointUrl = (codes: AuthParams): string => {
  const url = new URL(`${traQAPIBaseURL}/oauth2/authorize`)
  url.searchParams.set('response_type', 'code')
  url.searchParams.set('client_id', codes.clientId)
  url.searchParams.set('state', codes.state)
  url.searchParams.set('code_challenge', codes.codeChallenge)
  url.searchParams.set('code_challenge_method', 'S256')

  return url.href
}
