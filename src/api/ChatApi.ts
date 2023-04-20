import {BaseApi} from "./BaseApi";
import {User, ChatInfo} from "../utils/Types";

export class ChatsApi extends BaseApi {
    constructor() {
        super('/chats')
    }

    read(): Promise<ChatInfo[]> {
        return this.http.get('/')
    }

    create(title: string) {
        return this.http.post('/', { title })
    }

    delete(id: number): Promise<unknown> {
        return this.http.delete('/', { chatId: id })
    }

    getUsers(id: number): Promise<Array<User & { role: string }>> {
        return this.http.get(`/${id}/users`)
    }

    addUsers(users: number[], id: number): Promise<unknown> {
        return this.http.put('/users', { users, chatId: id })
    }

    deleteUsers(users: number[], id: number): Promise<unknown> {
        return this.http.delete('/users', { users, chatId: id })
    }

    async getToken(id: number): Promise<string | undefined> {
        try {
            const response = await this.http.post<{ token: string }>(`/token/${id}`)
            return response.token
        } catch (e) {
            console.log(e)
        }
        return undefined
    }
}

export const chatsApi = new ChatsApi()
