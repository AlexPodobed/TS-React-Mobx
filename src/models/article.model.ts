import { ISourceShort } from './source.model';

export interface IArticle {
  source: Partial<ISourceShort>,
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface IArticleResponse {
  status: 'ok' | 'error';
  totalResults: number;
  articles: IArticle[];
}


export enum ArticleType {
  MostRecent = 'top-headlines',
  Everything = 'everything'
}


export interface IArticleRequestParams {
  sources?: string;
  country?: string;
  category?: string;
  q?: string;
  pageSize?: number;
  page?: number;
}