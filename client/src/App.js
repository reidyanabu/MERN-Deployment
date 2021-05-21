import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './App.css';
import { Router  } from '@reach/router';
import NoDice from './views/NoDice';
import QuotesHeader from './views/QuotesHeader';
import Authors from './views/Authors';
import AddAuthor from './views/AddAuthor';
import EditAuthor from './views/EditAuthor';
import AuthorQuotes from './views/AuthorQuotes';
import AddQuote from './views/AddQuote';


function App() {
  return (
    <div className="App">
      <QuotesHeader/>
      <Router>
          <Authors default path='/'/>
          <AddAuthor path='/new' />
          <EditAuthor path='/edit/:author_id' />
          <AuthorQuotes path='/quotes/:author_id'/>
          <AddQuote path='/quotes/:author_id/new'/>
          <NoDice path='/no_dice'/>
      </Router>
    </div>
  );
}

export default App;
