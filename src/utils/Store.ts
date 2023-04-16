import EventBus from "./EventBus";
import {isEqual, set} from "./Helpers";
import {Block} from "./Block";
import {State} from "./Types"

export enum StoreEvents {
  // eslint-disable-next-line no-unused-vars
  Updated = 'Updated'
}

class Store extends EventBus {
  private state: State = {};

  public set(keypath: keyof State, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// eslint-disable-next-line no-unused-vars
const withStore = (mapStateToProps: (state: State) => Record<string, unknown>) => {
  let mappedState;
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        mappedState = mapStateToProps(store.getState());
        super({...props, ...mappedState});

        store.on(StoreEvents.Updated, () => {
          const newMappedState = mapStateToProps(store.getState());
          if(!isEqual(mappedState, newMappedState)){
            this.setProps({
              ...newMappedState
            })
          }
        });
      }
    }
  }
}

export { store, withStore };