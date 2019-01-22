import { action, computed, observable, toJS } from 'mobx';

import agent from '../agent';
import { API_ENABLED } from '../constants/config';
import { ISource } from '../models/source.model';
import { SourceListMocked } from './mock';

export class SourcesStore {
  @computed
  get activeSource(): ISource | undefined {
    return toJS(this.sources.find(store => store.id === this.activeSourceId));
  }

  @observable
  public loading = false;

  @observable
  public sources: ISource[] = [];

  @observable
  public activeSourceId: string | undefined;

  @action
  public loadSourceList() {
    if (!API_ENABLED) {
      // todo: remove it!
      this.sources = SourceListMocked;
      return Promise.resolve(true);
    }

    this.loading = true;
    return agent.Sources.all()
      .then(({ data }) => {
        this.loading = false;
        this.sources = data.sources;
        return data;
      })
      .catch(() => this.loading = false);
  }

  @action
  public selectActiveSource = (id: string) => {
    this.activeSourceId = id;
  };

  @action
  public clearActiveSource = () => {
    this.activeSourceId = undefined;
  };
}

const sourceStore = new SourcesStore();

export default sourceStore;
