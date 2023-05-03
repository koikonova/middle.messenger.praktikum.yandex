import {store} from "../utils/Store";
import {chatsApi, ChatsApi} from "../api/ChatApi";
import {messagesController} from "./MessageController";

class ChatsController {
    private readonly api: ChatsApi

    constructor() {
        this.api = chatsApi
    }

  async create(title: string) {
    const { id } = await this.api.create(title);
    const token = await this.api.getToken(id);
    const chat = {
      created_by: store.getState().user.id,
      last_message: null,
      unread_count: 0,
      avatar: null,
      title,
      token,
      id,
    };


    const chats = [...store.getState().chats, chat];

    store.set('chats', chats);
  }

    async fetchChats() {
      const chats = await this.api.read();

      const promises = chats.map((chat) => this.getToken(chat.id)
        .then((token) => ({ ...chat, token })));

      const result = await Promise.allSettled(promises);

      const chatsWithToken = result
        .filter((res) => res.status === 'fulfilled')
        .map((res) => res.value);

      store.set('chats', chatsWithToken)
    }

    async addUser(userId: number[], chatId: number) {
       await this.api.addUsers(userId, chatId)
    }

    async deleteUser(userId: number[], chatId: number) {
       await this.api.deleteUsers(userId, chatId)
    }

    async delete(id: number) {
        await this.api.delete(id)

        // this.fetchChats()
    }

    async getToken(id: number) {
      const token = await this.api.getToken(id)
      store.set('chat.id', id);
      return token;
    }

    async selectChat(id: number) {
        store.set('selectedChat', id)
    }
}

export const chatsController = new ChatsController()


