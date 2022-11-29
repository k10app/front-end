export interface UserRegister {
  login: string,
  email: string,
  password: string
}

export interface LoginResult {
  status: string,
  jwt: string
}

export interface LoginData {
  login: string,
  password: string
}

export interface CheckAuth {
  status: string,
  login: string,
  exp: string
}
