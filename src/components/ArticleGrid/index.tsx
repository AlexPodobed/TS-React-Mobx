import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { compose } from 'recompose';

import { IWithInfinityScrollProps, witInfinityScroll } from '../../hocs/withInfinityScroll';
import { IArticle } from '../../models/article.model';
import ArticleCard from '../ArticleCard';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
});

interface IArticleGridProps {
  list: IArticle[];
  handleClick: (article: IArticle) => void
}

const ArticleGrid: React.SFC<IArticleGridProps & WithStyles<typeof styles>> = ({ list, handleClick }) => {
  return (
    <Grid container={true} spacing={24}>
      {list.map((article, index) =>
        <Grid item={true}
              sm={12} md={6}
              key={index}
              onClick={handleClick.bind(null, article)}>
          <ArticleCard article={article}/>
        </Grid>
      )}
    </Grid>
  );
};


const enhance = compose<IArticleGridProps, IArticleGridProps & IWithInfinityScrollProps>(
  witInfinityScroll,
  withStyles(styles)
);

export default enhance(ArticleGrid);