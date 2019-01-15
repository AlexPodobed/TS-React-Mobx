import AppBar from '@material-ui/core/AppBar/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import * as React from 'react';
import SourcesContainer from '../../containers/Sources';

const drawerWidth = 240;

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
  content: {
    flexGrow: 1,
    marginLeft: -drawerWidth,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.leavingScreen,
      easing: theme.transitions.easing.sharp,
    }),
  },
  contentShift: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      duration: theme.transitions.duration.enteringScreen,
      easing: theme.transitions.easing.easeOut,
    }),
  },
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
  },
  drawerHeader: {
    alignItems: 'center',
    display: 'flex',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  hide: {
    display: 'none',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  root: {
    display: 'flex',
  },
});


interface ILayoutProps extends WithStyles<typeof styles, true> {
}

interface ILayoutState {
  open: boolean;
}

class Layout extends React.Component<ILayoutProps, ILayoutState> {
  public state = {
    open: true
  };

  public handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  public handleDrawerClose = () => {
    this.setState({ open: false });
  };

  public render() {
    const { theme, classes, children } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline/>

        <AppBar
          position='fixed'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <h3>News Feed App</h3>
          </Toolbar>
        </AppBar>


        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <SourcesContainer/>
        </Drawer>

        <main className={classNames(classes.content, {
          [classes.contentShift]: open,
        })}>
          <div className={classes.drawerHeader}/>
          {children}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Layout);
