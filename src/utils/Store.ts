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
export const withStore = <T>(mapStateToProps: (state: State) => any) => {
  return (Component: typeof Block) => {
    return class extends Component {
      constructor(props: T) {
        const mappedState = mapStateToProps(store.getState());
        super({ ...props, ...mappedState });

        store.on(StoreEvents.Updated, (newState: State) => {
          const newMappedState = mapStateToProps(newState);

          this.setProps(newMappedState);
        });
      }
    } as typeof Block;
  };
};
