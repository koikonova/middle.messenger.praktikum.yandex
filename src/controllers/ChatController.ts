import {store} from "../utils/Store";
import {chatsApi, ChatsApi} from "../api/ChatApi";

class ChatsController {
    private readonly api: ChatsApi

    constructor() {
        this.api = chatsApi
    }

    async create(title: string) {
        await this.api.create(title)
        this.fetchChats()
    }

    async fetchChats() {
        const chats = await this.api.read()
        chats.map(async (chat) => {
            const token = await this.getToken(chat.id)
            if (token) {
                // await messagesController.connect(chat.id, token)
            }
        })
        store.set('chats', chats)
    }

    async addUser(userId: number[], chatId: number) {
        this.api.addUsers(userId, chatId)
    }

    async deleteUser(userId: number[], chatId: number) {
        this.api.deleteUsers(userId, chatId)
    }

    async delete(id: number) {
        await this.api.delete(id)

        this.fetchChats()
    }

    async getToken(id: number) {
        return this.api.getToken(id)
    }

    selectChat(id: number) {
        store.set('selectedChat', id)
    }
}

export const chatsController = new ChatsController()
