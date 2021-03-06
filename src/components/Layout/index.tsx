import Button from '@material-ui/core/Button/Button';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import Divider from '@material-ui/core/Divider/Divider';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton/IconButton';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import classNames from 'classnames';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { drawerWidth } from '../../constants/sizes';
import SourcesContainer from '../../containers/Sources';
import { SourcesStore } from '../../stores/sourcesStore';
import Header from '../Header';


const styles = (theme: Theme) => createStyles({
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
    justifyContent: 'space-between',
  },

  drawerContent: {
    overflowY: 'auto'
  },
  drawerPaper: {
    width: drawerWidth,
  },
  hidden: {
    visibility: 'hidden'
  },
  root: {
    display: 'flex',
  },
});


interface ILayoutProps extends WithStyles<typeof styles, true> {
  sourcesStore?: SourcesStore;
}

interface ILayoutState {
  open: boolean;
}

@inject('sourcesStore')
@observer
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
    const { activeSource, clearActiveSource } = this.props.sourcesStore!;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline/>

        <Header
          openDrawer={this.handleDrawerOpen}
          open={open}
        />

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
            <Button
              onClick={clearActiveSource}
              className={classNames({ [classes.hidden]: !activeSource })}>
              reset
            </Button>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
            </IconButton>
          </div>
          <Divider/>
          <div className={classes.drawerContent}>
            <SourcesContainer/>
          </div>
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
