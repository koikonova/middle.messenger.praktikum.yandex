import { Block } from '../../utils/Block';

const labelTpl = `{{labelTitle}}`;

interface LabelProps{
  name: string;
  labelTitle: string;
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super('label', props);
  }

  _init() {
    this.element!.setAttribute('for', this.props.name);
  }

  render(): string {
    return this.compile(labelTpl, this.props);
  }
}
