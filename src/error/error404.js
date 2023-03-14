import Handlebars from 'handlebars';
import styles from "./style.scss";
import errorTpl from './errorTpl';

const error404 = () => {
    return Handlebars.compile(errorTpl)({error: '404', title: 'Не туда попали'});
};

export default error404;
