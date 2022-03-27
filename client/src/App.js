import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Principal from './components/Principal/Principal.jsx';
import Home from './components/Home/Home.jsx';
import CardDetail from './components/CardDetail/CardDetail.jsx';
import Form from './components/Form/Form.jsx';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={Principal}/>
          <Route path={'/home'} component={Home}/>
          <Route path={'/addDog'} component={Form} />
          <Route path={'/CardDetail/:id'} component={CardDetail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
