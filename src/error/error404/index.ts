import '../style.scss'
import {Block} from "../../utils/Block";
import {Error} from "../../components/Error";

const error404Tpl = '{{{error}}}';

export class Error404 extends Block {
    constructor(props: any) {
        super('div', props);
    }

    _init() {
        this.children.error = new Error({
            error: '404',
            title: 'Не туда попали',
        })
    }

    render() {
        return this.compile(error404Tpl, this.props);
    }
}
