import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import FilterPage from './components/filter';

function App() {
  return (<div className="container">
    <BrowserRouter>
    <div className='button-wrapper'>
      <Link to="/"><button>Real Time Data</button></Link>
      <Link to="/history"><button>Historical Data</button></Link>
    </div>
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/history' component={FilterPage} />
      </Switch>
    </BrowserRouter>
    </div>
    )}

export default App;
