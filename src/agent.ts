import axios from 'axios';

import { isUndefined, omitBy } from 'lodash';
import { RSS_API_KEY, RSS_API_URL } from './constants/config';
import { ArticleType, IArticleRequestParams, IArticleResponse } from './models/article.model';
import { ISourceResponse } from './models/source.model';

function buildUrl(path: string): string {
  return `${RSS_API_URL}${path}&apiKey=${RSS_API_KEY}`;
}

function prepareUrl(path: string, params: IArticleRequestParams = {}): string {
  const baseUrl = `${RSS_API_URL}${path}?apiKey=${RSS_API_KEY}`;


  const formattedParams = omitBy(params, isUndefined);
  let queryParams = Object.keys(formattedParams).reduce((result, key) => `${result}&${key}=${formattedParams[key]}`, '');

  // handle empty query
  if (!params.q && !params.sources) {
    if (path.includes(ArticleType.MostRecent)) {
      queryParams += '&country=us';
    }
    if (path.includes(ArticleType.Everything)) {
      queryParams += '&q="a"';
    }
  }

  return baseUrl + queryParams;
}

const Articles = {
  all: (type: ArticleType, params: IArticleRequestParams) => axios.get<IArticleResponse>(prepareUrl(`/${type}`, params))
};

const Sources = {
  all: () => axios.get<ISourceResponse>(buildUrl('/sources?language=en'))
};


export default {
  Articles,
  Sources,
};