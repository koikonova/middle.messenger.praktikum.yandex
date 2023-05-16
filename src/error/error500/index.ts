import '../style.scss'
import {Block} from "../../utils/Block";
import {Error} from "../../components/Error";

const error500Tpl = '{{{error}}}';

export class Error500 extends Block {
    constructor(props: any) {
        super('div', props);
    }

    _init() {
        this.children.error = new Error({
            error: '500',
            title: 'Мы уже фиксим',
        })
    }

    render() {
        return this.compile(error500Tpl, this.props);
    }
}
