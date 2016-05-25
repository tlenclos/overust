import { Route, IndexRoute } from 'react-router';
import App from './components/page/App';
import Home from './components/page/Home';
import Wipes from './components/Wipes';
import WipeForm from './components/forms/WipeForm';

export default (
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      {/**
        TODO use onEnter to check user, need to modify vitamin to add sore on routes
       **/}
      <Route component={Wipes} path="app" />
      <Route component={WipeForm} path="app/wipe/create" />
    </Route>
);
