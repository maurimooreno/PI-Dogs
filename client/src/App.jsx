import './App.css';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import axios from 'axios';
import dotenv from 'dotenv';

import Principal from './components/Principal/Principal.jsx';
import Home from './components/Home/Home.jsx';
import CardDetail from './components/CardDetail/CardDetail.jsx';
import Form from './components/Form/Form.jsx';
import ErrorPage from './components/ErrorPage/ErrorPage.jsx';

dotenv.config()

axios.defaults.baseURL = process.env.REACT_APP_API || 'http://localhost:3001';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={'/'} component={Principal}/>
          <Route excat path={'/home'} component={Home}/>
          <Route excat path={'/addDog'} component={Form} />
          <Route excat path={'/CardDetail/:id'} component={CardDetail} />
          <Route path={'*'} component={ErrorPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
