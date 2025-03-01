// import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
    public async register() {
        return { message: "User registered successfully" };
    }

    public async login() {
        return { message: "User logged in successfully" };
    }
}
