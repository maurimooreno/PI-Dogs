import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Principal from './components/Principal/Principal.jsx';
import Home from './components/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={Principal}/>
          <Route path={'/home'} component={Home}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
