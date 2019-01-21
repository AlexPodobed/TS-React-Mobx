import axios from 'axios';

import { RSS_API_KEY, RSS_API_URL } from './constants/config';
import { IArticleResponse } from './models/article.model';
import { ISourceResponse } from './models/source.model';

// EVERYTHING
// https://newsapi.org/v2/everything?q=bitcoin&apiKey=822725d39e244c458ef59aac989bf232
// https://newsapi.org/v2/everything?q=apple&from=2019-01-10&to=2019-01-10&sortBy=popularity&apiKey=822725d39e244c458ef59aac989bf232
// https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&apiKey=822725d39e244c458ef59aac989bf232

function buildUrl(path: string): string {
  return `${RSS_API_URL}${path}&apiKey=${RSS_API_KEY}`;
}

const TopHeadlines = {
  all: () => axios.get<IArticleResponse>(buildUrl('/top-headlines?country=us')),
  byCategory: (category: string) => axios.get<IArticleResponse>(buildUrl(`/top-headlines?country=us&category=${category}`)),
  bySource: (source: string) => axios.get<IArticleResponse>(buildUrl(`/top-headlines?sources=${source}`)),
  search: (query: string) => axios.get<IArticleResponse>(buildUrl(`/top-headlines?country=us&q=${query}`))
};


const Sources = {
  all: () => axios.get<ISourceResponse>(buildUrl('/sources?language=en'))
};


export default {
  Sources,
  TopHeadlines,
};