import {Block} from './Block';
import {isEqual} from './Helpers';

export const render = (query: string, block: Block) => {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';
  
  root.append(block.getContent());

  block.dispatchComponentDidMoun();

  return root;
}

export interface BlockClass<P extends Record<string, any> = any> {
  // eslint-disable-next-line no-unused-vars
  new(props: P): Block<P>;
}

export class Route {
  private block: Block | null = null;
  private pathname: string;
  private readonly blockClass: typeof Block;
  private readonly query: string;

  constructor(pathname: string, view: typeof Block, query: string) {
    this.pathname = pathname;
    this.blockClass = view;
    this.query = query;
  }

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname)
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({})

      render(this.query, this.block)
      return
    }
  }
}

export class Router {
  private static __instance: Router

  private routes: Route[] = []

  private currentRoute: Route | null = null

  private readonly rootQuery: string

  private history = window.history

  constructor(rootQuery: any) {
    this.rootQuery = rootQuery;

    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use(pathname: string, block: typeof Block) {
    const route = new Route(pathname, block, this.rootQuery)
    this.routes.push(route)

    return this
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window
      this._onRoute(target.location.pathname)
    }
    this._onRoute(window.location.pathname)
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname)

    this._onRoute(pathname)
  }

  public back() {
    this.history.back()
  }

  public forward() {
    this.history.forward()
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname)
    if (!route) {
      return
    }
    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }
    this.currentRoute = route
    route.render()
  }

  private getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }
}

export const router = new Router('.root')
