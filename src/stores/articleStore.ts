import { action, computed, observable, reaction, toJS } from 'mobx';

import agent from '../agent';
import { ArticleType, IArticle } from '../models/article.model';
import sourceStore from './sourcesStore';
import uiStore from './uiStore';

export class ArticleStore {
  @observable
  public loading = false;

  @observable
  public total: number = 0;

  @observable
  public searchQuery: string;

  @observable
  public articles: IArticle[] = [];

  @observable
  private type: ArticleType = ArticleType.MostRecent;

  @observable
  private selectedArticle: IArticle | undefined;


  constructor() {
    reaction(
      () => sourceStore.activeSourceId,
      (source) => {
        uiStore.scrollToTop();
        this.loadBySource(source);
      }
    );

    reaction(
      () => this.searchQuery,
      (query) => this.searchBy(query)
    );
  }

  @computed get activeType() {
    return toJS(this.type);
  }

  @computed get activeArticle() {
    return toJS(this.selectedArticle);
  }

  @action
  public setType = (type: ArticleType) => this.type = type;

  @action
  public setQuery = (value: string) => this.searchQuery = value;

  @action
  public setActiveArticle = (article: IArticle) => {
    this.selectedArticle = article;
  };

  @action
  public resetActiveArticle = () => {
    this.selectedArticle = undefined;
  };


  @action
  public loadTopHeadlines() {
    this.loading = true;

    return agent.TopHeadlines.all()
      .then(({ data }) => {
        this.total = data.totalResults;
        this.articles = data.articles;
        this.loading = false;
        return data;
      })
      .catch(() => this.loading = false);
  }

  @action
  public loadBySource(source: string) {
    this.loading = true;

    return agent.TopHeadlines.bySource(source)
      .then(({ data }) => {
        this.total = data.totalResults;
        this.articles = data.articles;
        this.loading = false;
        return data;
      })
      .catch(() => this.loading = false);
  }


  @action
  public searchBy(q: string) {
    this.loading = true;

    return agent.TopHeadlines.search(q)
      .then(({ data }) => {
        this.loading = false;
        this.articles = data.articles;
        this.total = data.totalResults;
        return data;
      })
      .catch(() => this.loading = false);
  }
}

const articleStore = new ArticleStore();

export default articleStore;