import {SigninData, SignupData} from "../utils/Types";
import {authApi, AuthApi} from "../api/AuthApi";
import {store} from "../utils/Store";
import {router} from "../utils/Router";

class AuthController {
    private readonly api: AuthApi

    constructor() {
        this.api = authApi
    }

    async signin(data: SigninData) {
        try {
            await this.api.signin(data)
            await this.fetchUser()
            router.go('/messenger')
        } catch (e) {
            console.error(e)
            if (e.reason === "User already in system"){
                router.go("/messenger");
            }
        }
    }

    async signup(data: SignupData) {
        try {
            await this.api.signup(data)
            await this.fetchUser()
            router.go('/messenger')
        } catch (e) {
            console.error(e)
            if (e.reason === "User already in system"){
                router.go("/messenger");
            }
        }
    }

    public async fetchUser() {
        const user = await this.api.read()
        store.set('user', user)
    }

    async logout() {
        try {
            await this.api.logout()
            router.go('/')
        } catch (e) {
            console.error(e)
        }
    }
}

export const authController = new AuthController()
