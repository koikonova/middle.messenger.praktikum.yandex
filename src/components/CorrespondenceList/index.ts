import { Block } from '../../utils/Block';
import {ChatInfo} from "../../utils/Types";
import {withStore} from "../../utils/Store";
import {chatsController} from "../../controllers/ChatController";

const correspondenceListTpl ='';

interface ChatsListProps {
  chats: ChatInfo[]
  isLoaded: boolean
  createChatMode: boolean
}

export class CorrespondenceList extends Block <ChatsListProps> {
  constructor(props: ChatsListProps) {
    super({ ...props })
  }

  _init() {
    this.children.chats = this.createChats(this.props)
  }

  protected componentDidUpdate(_oldProps: ChatsListProps, newProps: ChatsListProps): boolean {
    this.children.chats = this.createChats(newProps)
    return true
  }

  private createChats(props: ChatsListProps) {
    console.log(props)
    return props.chats.map((data) => new Chat({
      ...data,
      events: {
        click: () => {
          chatsController.selectChat(data.id)
        },
      },
    }))
  }

  protected render(): string {
    return this.compile(correspondenceListTpl, { ...this.props})
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(CorrespondenceList);
