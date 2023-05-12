import {ChangePassword} from "../utils/Types";
import {profileApi, ProfileApi} from "../api/ProfileApi";
import {store} from "../utils/Store";
import {authController} from "./AuthController";

class ProfileController {
    private readonly api: ProfileApi

    constructor() {
        this.api = profileApi
    }

    async updateProfile(data: Record<string, string>) {
        try {
            await this.api.update(data)
            await authController.fetchUser()
        } catch (e) {
            console.error(e)
        }
    }

    async changeAvatar(data: FormData) {
        try {
            await this.api.changeAvatar(data)
            await authController.fetchUser()
        } catch (e) {
            console.error(e)
        }
    }

    async changePassword(data: ChangePassword) {
        try {
            const user = await this.api.changePassword(data)
            store.set('user.data', user)
        } catch (e) {
            console.error(e)
        }
    }
}

export const profileController = new ProfileController()
