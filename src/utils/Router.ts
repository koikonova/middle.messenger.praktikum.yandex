import { Block } from "./Block";
import {isEqual} from "./Helpers";

class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: any;

  constructor(pathname, view, props) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
      console.log(this._block);

      if (this._block) {
        this._block.getContent()?.remove();
      }
  }

  match(pathname) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    const root = document.querySelector('.root');

    if (!this._block) {
      this._block = new this._blockClass();

      root.innerHTML = '';
      root.appendChild(this._block?.getContent());

      return;
    }

    if (!root) {
      throw new Error('Root not found');
    }
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history = window.history;
  private _currentRoute: Route | null = null;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;

    Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, {rootQuery: '.app'});

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = () => {
      this._onRoute(window.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}

export default new Router();