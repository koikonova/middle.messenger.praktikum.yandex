import { BaseApi } from './BaseApi';
import {User, ChangePassword} from "../utils/Types";

export type UserFields = Omit<User, 'password' | 'avatar'>

export class ProfileApi extends BaseApi {
    constructor() {
        super('/user')
    }

    read(identifier: string): Promise<UserFields> {
        return this.http.get(`/${identifier}`)
    }

    update(data: Record<string, unknown>): Promise<User> {
        return this.http.put('/profile', data)
    }

    changeAvatar(data: FormData): Promise<UserFields> {
        return this.http.put('/profile/avatar', data)
    }

    changePassword(data: ChangePassword): Promise<UserFields> {
        return this.http.put('/password', data)
    }
}

export const profileApi = new ProfileApi()
