import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar/AppBar';
import IconButton from '@material-ui/core/IconButton/IconButton';
import InputBase from '@material-ui/core/InputBase/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { ChangeEvent } from 'react';

import { drawerWidth } from '../../constants/sizes';
import { ArticleType } from '../../models/article.model';
import { ArticleStore } from '../../stores/articleStore';
import { SourcesStore } from '../../stores/sourcesStore';
import ArticleTypeSwitcher from '../ArticleTypeSwitcher';


const styles = (theme: Theme) => createStyles({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
    width: `calc(100% - ${drawerWidth}px)`,
  },
  hide: {
    display: 'none',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    borderRadius: theme.shape.borderRadius,
    position: 'relative', '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

interface IHeaderProps extends WithStyles<typeof styles, true> {
  open: boolean;
  openDrawer: () => void;
  sourcesStore?: SourcesStore;
  articleStore?: ArticleStore;
}

@inject('sourcesStore', 'articleStore')
@observer
class Header extends React.Component<IHeaderProps> {
  private static INPUT_DELAY = 400;

  private reactOnChange = debounce(
    (value: string) => {
      const { setQuery } = this.props.articleStore!;
      setQuery(value);
    },
    Header.INPUT_DELAY
  );

  public render() {
    const { classes, openDrawer, open } = this.props;
    const { activeType } = this.props.articleStore!;

    return <AppBar
      position='fixed'
      className={classNames(classes.appBar, {
        [classes.appBarShift]: open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={openDrawer}
          className={classNames(classes.menuButton, open && classes.hide)}
        >
          <MenuIcon/>
        </IconButton>
        <h3>
          News Feed App
          {this.printSelectedSource()}
        </h3>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon/>
          </div>
          <InputBase
            placeholder='Search...'
            onChange={this.handleInputChange}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
        <ArticleTypeSwitcher
          handleSelect={this.updateActiveType}
          selectedType={activeType}
        />
      </Toolbar>
    </AppBar>;
  }


  private updateActiveType = (value: ArticleType) => {
    const { setType } = this.props.articleStore!;
    setType(value);
  };

  private handleInputChange = (value: ChangeEvent<HTMLInputElement>) => {
    this.reactOnChange(value.target.value);
  };

  private printSelectedSource() {
    const { activeSource } = this.props.sourcesStore!;

    if (activeSource) {
      return ` [${activeSource.name}]`;
    }

    return null;
  }
}

export default withStyles(styles, { withTheme: true })(Header);