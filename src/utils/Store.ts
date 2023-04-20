import {set} from "./Helpers";
import EventBus from "./EventBus";
import {State} from "./Types";
import {Block} from "./Block";

export enum StoreEvents {
  // eslint-disable-next-line no-unused-vars
  Updated = 'updated'
}

export class Store extends EventBus {
  private state: any = {}

  public set(keypath: string, data: unknown) {
    set(this.state, keypath, data)

    this.emit(StoreEvents.Updated, this.getState())
  }

  public getState() {
    return this.state
  }
}

export const store = new Store()
// eslint-disable-next-line no-unused-vars
export function withStore<SP extends Partial<any>>(mapStateToProps: (state: State) => SP) {
  return function wrap<P>(Component: typeof Block<SP & P>) {
    return class WithStore extends Component {
      constructor(props: Omit<P, keyof SP>) {
        let mappedState = mapStateToProps(store.getState())

        super({ ...(props as P), ...mappedState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState())

          mappedState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}



