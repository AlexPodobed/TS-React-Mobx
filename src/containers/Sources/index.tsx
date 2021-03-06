import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { Fragment } from 'react';

import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { SourcesStore } from '../../stores/sourcesStore';


interface ISourcesContainerProps {
  sourcesStore?: SourcesStore
}

@inject('sourcesStore')
@observer
export default class SourcesContainer extends React.Component<ISourcesContainerProps> {
  public componentWillMount() {
    const { sourcesStore } = this.props;
    if (sourcesStore) {
      sourcesStore.loadSourceList();
    }
  }

  public render() {
    const { loading } = this.props.sourcesStore!;

    return <Fragment>
      {this.renderLoading(loading)}
      {this.renderSourceList()}
    </Fragment>;
  }

  private renderLoading(loading: boolean) {
    if (loading) {
      return <CircularProgress/>;
    }

    return null;
  }

  private selectActive(id: string) {
    const { selectActiveSource } = this.props.sourcesStore!;
    selectActiveSource(id);
  }

  private renderSourceList() {
    const { sources, activeSource } = this.props.sourcesStore!;


    if (!sources) {
      return;
    }

    return <List>
      {sources.map(source => {
          const handleClick = () => this.selectActive(source.id);
          return <ListItem
            selected={activeSource ? source.id === activeSource.id : false}
            onClick={handleClick}
            button={true}
            key={source.id}>
            <ListItemText>{source.name}</ListItemText>
          </ListItem>;
        }
      )}
    </List>;
  }
}