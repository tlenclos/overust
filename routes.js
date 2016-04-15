import { Route, IndexRoute } from 'react-router';
import Counter from './components/app';
import Home from './components/home';

export default (
    <Route path="/">
      <IndexRoute component={Home} />
      {/**
        TODO use onEnter to check user, need to modify vitamin to add sore on routes
       **/}
      <Route component={Counter} path="admin" />
    </Route>
);
