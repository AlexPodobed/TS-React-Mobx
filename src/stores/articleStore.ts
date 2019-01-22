import { action, computed, observable, reaction, toJS } from 'mobx';

import agent from '../agent';
import { API_ENABLED } from '../constants/config';
import { ArticleType, IArticle, IArticleRequestParams } from '../models/article.model';
import { ArticleListMocked } from './mock';
import sourceStore from './sourcesStore';
import uiStore from './uiStore';

export class ArticleStore {
  get getParams(): IArticleRequestParams {
    return {
      q: this.searchQuery,
      sources: sourceStore.activeSourceId,
      page: this.page,
      pageSize: this.pageSize
    };
  }

  @computed get activeType() {
    return toJS(this.type);
  }

  @computed get activeArticle() {
    return toJS(this.selectedArticle);
  }

  @observable
  public loading = false;

  @observable
  public total: number = 0;

  @observable
  public searchQuery: string;

  @observable
  public articles: IArticle[] = [];

  @observable
  public pageSize = 20;

  @observable
  public page = 1;

  @observable
  private type: ArticleType = ArticleType.MostRecent;

  @observable
  private selectedArticle: IArticle | undefined;

  constructor() {
    reaction(
      () => sourceStore.activeSourceId,
      () => this.fetchAndScrollTop()
    );

    reaction(
      () => this.searchQuery,
      () => this.fetchAndScrollTop()
    );

    reaction(
      () => this.type,
      () => this.fetchAndScrollTop()
    );
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
  public setPage = (page: number) => this.page = page;

  @action
  public setPageSize = (size: number) => this.pageSize = size;

  @action
  public fetchArticles() {
    if (!API_ENABLED) {
      return this.returnMockedData();
    }

    this.loading = true;
    this.page = 1;

    return agent.Articles.all(this.activeType, this.getParams)
      .then(({ data }) => {
        this.loading = false;
        this.articles = data.articles;
        this.total = data.totalResults;
        return data;
      })
      .catch(() => this.loading = false);
  }

  @action
  public fetchMoreArticles = (page: number) => {
    if (!API_ENABLED) {
      return this.returnMockedData();
    }

    this.loading = true;
    this.page = page;

    return agent.Articles.all(this.activeType, this.getParams)
      .then(({ data }) => {
        this.loading = false;
        this.articles = [...this.articles.slice(), ...data.articles];
        this.total = data.totalResults;
        return data;
      })
      .catch(() => this.loading = false);
  };

  private fetchAndScrollTop() {
    this.fetchArticles().then(() => uiStore.scrollToTop());
  }

  // todo: remove it!
  private returnMockedData() {
    // @ts-ignore
    this.articles = ArticleListMocked;
    this.total = 100;
    return Promise.resolve(true);
  }
}

const articleStore = new ArticleStore();

export default articleStore;