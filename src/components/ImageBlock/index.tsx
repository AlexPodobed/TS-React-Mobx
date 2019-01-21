import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import ImageIcon from '@material-ui/icons/Image';
import * as React from 'react';

import './styles.scss';

interface IImageBlock {
  url: string;
  title?: string;
}

const ImageBlock: React.SFC<IImageBlock> = ({ title, url }) => {

  let image = <div className='image-block__empty'>
    <ImageIcon/>
  </div>;

  if (url) {
    image = <CardMedia
      className='image-block__media'
      image={url}
      title={title}
    />;
  }

  return image;

};

export default ImageBlock;