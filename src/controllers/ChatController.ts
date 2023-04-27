import {store} from "../utils/Store";
import {chatsApi, ChatsApi} from "../api/ChatApi";
import {messagesController} from "./MessageController";

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
        store.set('chats', chats)

        console.log('fetchChats')
        console.log(store)
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
        await this.api.getToken(id)
          .then(() => {
              store.set('chat.id', id);
          })
        console.log(id);
    }
    //
    // selectChat(id: number) {
    //     store.set('selectedChat', id)
    //     console.log(id)
    // }
}

export const chatsController = new ChatsController()
