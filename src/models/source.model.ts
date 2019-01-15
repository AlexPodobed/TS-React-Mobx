export interface ISourceShort {
  id: string;
  name: string;
}

export interface ISource extends ISourceShort {
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}


export interface ISourceResponse {
  status: 'ok';
  sources: ISource[];
}