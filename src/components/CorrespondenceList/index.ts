import { Block } from '../../utils/Block';
import {ChatInfo} from "../../utils/Types";
import {withStore} from "../../utils/Store";

const correspondenceListTpl ='';

export class CorrespondenceList extends Block <ChatInfo[]> {
  constructor(props: ChatInfo[]) {
    super('div', props);
  }

  _init() {
    this.children.chats = this.createChats(this.props)
  }

  protected componentDidUpdate(_oldProps: ChatInfo[], newProps: ChatInfo[]): boolean {
    this.children.chats = this.createChats(newProps)
    return true
  }

  private createChats(props: ChatInfo[]) {
    console.log(props)
    // return props.map((data) => new Correspondence({
    //   ...data,
    //   events: {
    //     // click: () => {
    //     //   chatsController.selectChat(data.id)
    //     // },
    //   },
    // }))
  }

  render(): string {
    return this.compile(correspondenceListTpl, this.props);
  }
}

const withChats = withStore((state) => ({ chats: [...(state.chats || [])] }));

export const ChatsList = withChats(CorrespondenceList);
