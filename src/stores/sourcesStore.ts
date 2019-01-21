import { action, computed, observable, toJS } from 'mobx';

import agent from '../agent';
import { ISource } from '../models/source.model';

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
  public activeSourceId: string;

  @action
  public loadSourceList() {
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
}

const sourceStore = new SourcesStore();

export default sourceStore;
