import { action, computed, observable } from 'mobx';

import agent from '../agent';
import { ISource } from '../models/source.model';

export class SourcesStore {
  @observable
  public loading = false;

  @observable
  public sources: ISource[] = [];

  @observable
  public activeSourceId: string;


  @computed get activeSource(): ISource | null {
    return this.sources.find(store => store.id === this.activeSourceId) || null;
  }

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