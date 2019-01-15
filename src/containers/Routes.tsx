import * as React from 'react';
import { Fragment } from 'react';
import { Route, Switch, withRouter } from 'react-router';
import Layout from 'src/components/Layout';
import TopHeadingsContainer from './TopHeadings';

const Routes = () => {
  return (
    <Fragment>
      <Switch>
        <Layout>
          <Route path='' component={TopHeadingsContainer}/>
        </Layout>
      </Switch>
    </Fragment>
  );
};

export default withRouter(Routes);