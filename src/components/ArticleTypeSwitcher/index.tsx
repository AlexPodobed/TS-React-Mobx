import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl/FormControl';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';
import Select from '@material-ui/core/Select/Select';
import * as React from 'react';
import { ChangeEvent } from 'react';
import { ArticleType } from '../../models/article.model';


const styles = (theme: Theme) => createStyles({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

interface IMenuItem {
  value: ArticleType;
  title: string;
}

const menuItems: IMenuItem[] = [
  {
    value: ArticleType.MostRecent,
    title: 'Top Headlines'
  },
  {
    value: ArticleType.Everything,
    title: 'Everything'
  }
];

interface IArticleTypeSwitcherProps extends WithStyles<typeof styles, true> {
  selectedType: ArticleType;
  handleSelect: (value: ArticleType) => void;
}

interface IArticleTypeSwitcherState {
  open: boolean;
}

class ArticleTypeSwitcher extends React.Component<IArticleTypeSwitcherProps, IArticleTypeSwitcherState> {
  public state = {
    open: false
  };
  
  public handleOpen = () => {
    this.setState({ open: true });
  };

  public handleClose = () => {
    this.setState({ open: false });
  };

  public handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const { handleSelect } = this.props;
    const value = event.target.value as ArticleType;
    handleSelect(value);
  };

  public render() {
    const { classes, selectedType } = this.props;

    return (
      <div>
        <FormControl className={classes.formControl}>
          <Select
            open={this.state.open}
            onClose={this.handleClose}
            onOpen={this.handleOpen}
            onChange={this.handleChange}
            value={selectedType}
          >
            {menuItems.map(({ value, title }) =>
              <MenuItem
                value={value}
                key={value}>
                {title}
              </MenuItem>
            )}
          </Select>
        </FormControl>
      </div>
    );
  }
}


export default withStyles(styles, { withTheme: true })(ArticleTypeSwitcher);