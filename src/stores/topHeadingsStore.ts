import { action, observable } from 'mobx';

import agent from '../agent';
import { IArticle } from '../models/article.model';

export class ArticleStore {
  @observable
  public loading = false;

  @observable
  public total: number = 0;

  @observable
  public articles: IArticle[] = [];


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

}

const articleStore = new ArticleStore();

export default articleStore;