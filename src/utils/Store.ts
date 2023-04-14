import {User} from "../api/AuthAPI";
import EventBus from "./EventBus";
import {isEqual, set} from "./Helpers";
import {Block} from "./Block";

export enum StoreEvents {
  // eslint-disable-next-line no-unused-vars
  Updated = 'Updated'
}

interface State {
  user: {
    data?: User;
    hasError?: boolean;
  }
}

class Store extends EventBus {
  private state: State ={user: {}};

  public set(keypath: string, value: unknown) {
    set(this.state, keypath, value);

    this.emit(StoreEvents.Updated, this.state);
  }

  public getState() {
    return this.state;
  }
}

const store = new Store();

// eslint-disable-next-line no-unused-vars
const withStore = (mapStateToProps: (state: State) => any) => {
  let mappedState;
  return (Component: typeof Block) => {
    return class WithStore extends Component {
      constructor(props: any) {
        mappedState = mapStateToProps(store.getState());
        super({...props, ...mappedState});

        store.on(StoreEvents.Updated, (newState) => {
          const newMappedState = mapStateToProps(newState);
          if(isEqual(mappedState, newMappedState)){
            return;
          }
          this.setProps(newMappedState);
        });
      }
    }
  }
}

export { store, withStore };