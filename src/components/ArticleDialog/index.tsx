import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'
import * as React from 'react';
import { IArticle } from '../../models/article.model';
import ImageBlock from '../ImageBlock';

interface IArticleDialogProps {
  name?: string;
  open: boolean;
  handleClose: () => void;
  article: IArticle;
}

class ArticleDialog extends React.Component<IArticleDialogProps> {
  public render() {
    const { open, handleClose, article } = this.props;
    const { title, content, urlToImage, url, description } = article;
    console.log(article);
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth='lg'
      >
        <DialogTitle>{title}</DialogTitle>

        <DialogContent>
          <ImageBlock url={urlToImage} title={title}/>
          <DialogContentText>{content || description}</DialogContentText>
          <p>
            <a href={url} target='_blank'>link to source</a>
          </p>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>
            Close
          </Button>
        </DialogActions>

      </Dialog>
    );
  }
}

export default ArticleDialog;