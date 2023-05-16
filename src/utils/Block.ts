import EventBus from './EventBus';
import { nanoid } from "nanoid";
// @ts-ignore
import Handlebars from "handlebars";

//@ts-ignore
// eslint-disable-next-line
export class Block<Props extends Record<string, any> = unknown> {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  public id = nanoid(5);
  protected props: any;
  private eventBus: () => EventBus;
  private _element: HTMLElement | null = null;
  private _meta: { tagName: any; props: any; };
  protected children: Record<string, Block>;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName: any = "div", propsWithChildren: any = {}) {
    const eventBus = new EventBus();

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      props
    };

    this.children = children;
    this.props = this._makePropsProxy(props);

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenAndProps(childrenAndProps: any){
    const props: Record<string, any> = {};
    const children: Record<string, Block> = {};

    Object.entries(childrenAndProps).forEach(([key, value]) => {
      if(value instanceof Block){
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children };
  }

  _addEvents() {
    const {events = {}} = this.props as { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const {tagName} = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  // eslint-disable-next-line
 _init() {
  }

  init() {
    this._createResources();
    this._init();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  // eslint-disable-next-line
  componentDidMount() {
  }

  dispatchComponentDidMoun() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: any, newProps: any) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }
  
  //@ts-ignore
  // eslint-disable-next-line
  componentDidUpdate(oldProps: any, newProps: any) {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };
  
//@ts-ignore
  get element() {
    return this._element;
  }

  _render() {
    const block = this.render();
    this._removeEvents();
    this._element!.append(block);
    this._addEvents();
  }


  render(): DocumentFragment{
    return new DocumentFragment();
  }

  compile(template: string, context: any): DocumentFragment {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
          if (Array.isArray(component)) {
            contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`).join('')
          } else {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`
          }
    })

    const tpl = Handlebars.compile(template);
    const html = tpl(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

      const replaceStub = (component: Block) => {
        const stub = temp.content.querySelector(`[data-id="${component.id}"]`)

        if (!stub) {
          return
        }

        component.getContent()?.append(...Array.from(stub.childNodes))

        stub.replaceWith(component.getContent()!)
      };
      // eslint-disable-next-line
      Object.entries(this.children).forEach(([_, component]) => {
        if (Array.isArray(component)) {
          component.forEach(replaceStub)
        } else {
          replaceStub(component)
        }
      });

      return temp.content;
  }

  getContent(): any {
    return this.element;
  }

  _makePropsProxy(props: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    return new Proxy(props as unknown as object, {
      get(target: Record<string, unknown>, prop: string) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target: Record<string, unknown>, prop: string, value: unknown) {
        const oldTarget = target[prop];
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Отказано в доступе');
      },
    })
  }

  _removeEvents() {
    const events: Record<string, () => void> = (this.props as any).events;

    if (!events || !this._element) {
      return;
    }


    Object.entries(events).forEach(([event, listener]) => {
      this._element!.removeEventListener(event, listener);
    });
  }

  _createDocumentElement(tagName: string): HTMLElement {
    // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
    return document.createElement(tagName);
  }
}
