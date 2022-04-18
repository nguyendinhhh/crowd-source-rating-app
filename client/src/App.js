import './App.css';
import {Router} from '@reach/router';
import Home from './views/Home';
import Login from './views/Login';
import Register from './views/Register';
import PollDetail from './views/PollDetail';
import RatingDetail from './views/RatingDetail';
import Manage from './views/Manage';
import Create from './views/Create';
import Security from './views/Security';

function App() {
  return (
    <div>
      <Router>
        <Home path = '/'/>
        <Login path = '/login'/>
        <Register path = '/register'/>
        <PollDetail path ='/polldetail/:pollid'/>
        <RatingDetail path ='/ratingdetail/:ratingid'/>
        <Manage path ='/manage'/>
        <Create path ='/create'/>
        <Security path ='/security'/>
      </Router>
    </div>
  );
}

export default App;
