import Handlebars from 'handlebars';
import styles from "./style.scss";
import errorTpl from './errorTpl';

const error500 = () => {
    return Handlebars.compile(errorTpl)({error: '500', title: 'Мы уже фиксим'});
};

export default error500;
