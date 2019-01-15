import * as React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import { formatTime } from 'src/utils/time-formatter';
import { IArticle } from '../../models/article.model';
import './styles.scss';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard: React.SFC<IArticleCardProps> = ({ article }) => {
  const { title, author, urlToImage, description, publishedAt } = article;
  const time = formatTime(publishedAt);


  const printSubHeader = () => {
    return <div className='d-flex flex-row justify-between'>
      <span>{author}</span>
      <span>{time}</span>
    </div>;
  };

  return (
    <Card className='article-card'>
      <CardHeader
        title={title}
        subheader={printSubHeader()}
      />
      <CardMedia
        className='article-card__media'
        image={urlToImage}
        title={title}
      />
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;