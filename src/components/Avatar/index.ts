import { Block } from '../../utils/Block';

const avatarTpl = `
  <img class="avatarImg" src="{{src}}"/>
  <div class="changImgBox">
    <h4 class="changeImg">Поменять<br>аватар</h4>
  </div>`;

interface AvatarProps{
  src: string;
  events: { click: (event: Event) => void; };
}

export class Avatar extends Block {
  constructor(props: AvatarProps) {
    super('div', props);
  }

  _init() {
    this.element!.classList.add('avatar');
  }

  render() {
    return this.compile(avatarTpl, this.props);
  }
}
