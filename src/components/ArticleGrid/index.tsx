import Grid from '@material-ui/core/Grid';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { IArticle } from '../../models/article.model';
import ArticleCard from '../ArticleCard';

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
  },
});

interface IArticleGridProps extends WithStyles<typeof styles> {
  list: IArticle[];
  handleClick: (article: IArticle) => void
}

const ArticleGrid: React.SFC<IArticleGridProps> = ({ list, handleClick }) => {
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


export default withStyles(styles)(ArticleGrid);