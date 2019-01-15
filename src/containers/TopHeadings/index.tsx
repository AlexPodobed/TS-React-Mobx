import LinearProgress from '@material-ui/core/LinearProgress';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Fragment } from 'react';

import ArticleGrid from 'src/components/ArticleGrid';
import { SourcesStore } from '../../stores/sourcesStore';
import { ArticleStore } from '../../stores/topHeadingsStore';

interface ITopHeadingsContainerProps {
  topHeadingStore?: ArticleStore,
  sourcesStore?: SourcesStore
}

@inject('topHeadingStore', 'sourcesStore')
@observer
class TopHeadingsContainer extends React.Component<ITopHeadingsContainerProps> {
  public componentDidMount() {
    this.fetchList();
  }

  public fetchList(): void {
    const { topHeadingStore } = this.props!;

    if (topHeadingStore) {
      topHeadingStore.loadTopHeadlines();
    }
  }

  public render() {
    const { loading, total, articles } = this.props.topHeadingStore!;
    const { activeSource } = this.props.sourcesStore!;

    console.log('active source:::', activeSource);

    return (
      <Fragment>
        <h1>TopHeadingsContainer</h1>
        <p>total: {total}</p>
        {this.printLoader(loading)}
        <div className="article-list">
          <ArticleGrid list={articles}/>
        </div>
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

export default TopHeadingsContainer;