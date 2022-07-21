import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import SearchItem from "./components/searchItem/searchItem";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<SearchItem />}> 
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
