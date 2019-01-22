import LinearProgress from '@material-ui/core/LinearProgress';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Fragment } from 'react';

import ArticleGrid from 'src/components/ArticleGrid';
import ArticleDialog from '../../components/ArticleDialog';
import { IArticle } from '../../models/article.model';
import { ArticleStore } from '../../stores/articleStore';
import { SourcesStore } from '../../stores/sourcesStore';

interface IArticlesContainerProps {
  articleStore?: ArticleStore,
  sourcesStore?: SourcesStore
}

interface IArticlesContainerStore {
  open: boolean
}

@inject('articleStore', 'sourcesStore')
@observer
class ArticlesContainer extends React.Component<IArticlesContainerProps, IArticlesContainerStore> {
  constructor(props: IArticlesContainerProps) {
    super(props);
    this.state = {
      open: false
    };
  }

  public componentDidMount() {
    this.fetchList();
  }

  public fetchList(): void {
    const { fetchArticles } = this.props.articleStore!;

    fetchArticles();
  }

  public fetchMore(page: number): void {
    const { fetchMoreArticles } = this.props.articleStore!;

    fetchMoreArticles(page);
  }

  public handleClose = () => {
    const { resetActiveArticle } = this.props.articleStore!;

    resetActiveArticle();
    this.setState({ open: false });
  };

  public openModal = (article: IArticle) => {
    const { setActiveArticle } = this.props.articleStore!;

    setActiveArticle(article);
    this.setState({ open: true });
  };


  public render() {
    const { loading, articles, activeArticle, total, page } = this.props.articleStore!;
    const { open } = this.state;

    return (
      <Fragment>
        {this.printLoader(loading)}
        <div className="article-list">
          <ArticleGrid
            total={total}
            size={articles.length}
            loading={loading}
            list={articles}
            onLazyLoad={this.fetchMore.bind(this, page + 1)}
            handleClick={this.openModal}/>
        </div>
        {activeArticle
          ? <ArticleDialog open={open}
                           article={activeArticle}
                           handleClose={this.handleClose}
          />
          : null
        }
      </Fragment>
    );
  }

  private printLoader(display: boolean) {
    if (display) {
      return <LinearProgress/>;
    }

    return null;
  }
}

export default ArticlesContainer;