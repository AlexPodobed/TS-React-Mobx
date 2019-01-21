import { action } from 'mobx';


export class UiStore {

  @action
  public scrollToTop = () => {
    window.scrollTo(0, 0);
  }
}

const uiStore = new UiStore();

export default uiStore;