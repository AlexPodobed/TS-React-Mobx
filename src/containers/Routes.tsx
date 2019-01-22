import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Layout from 'src/components/Layout';
import ArticlesContainer from './Articles';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Layout>
          <Route path='' component={ArticlesContainer}/>
        </Layout>
      </Switch>
      <DevTools/>
    </Fragment>
  );
};

export default withRouter(Routes);