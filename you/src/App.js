// import logo from './logo.svg';
import {Counter} from "./components/Counter";
import {Todo} from "./components/Todo";
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter end = {10} />
      <Todo />
    </div>
  );
}

export default App;
