import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import WipeForm from './components/forms/WipeForm';

export default (
    <Route path="/">
      <IndexRoute component={Home} />
      {/**
        TODO use onEnter to check user, need to modify vitamin to add sore on routes
       **/}
      <Route component={App} path="app" />
      <Route component={WipeForm} path="app/wipe/create" />
    </Route>
);
