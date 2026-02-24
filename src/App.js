import logo from './logo.svg';
import './App.css';
import Front from './components/pages/Front';
import Result from './components/pages/Result';
import Upload from './components/pages/Upload';
function App() {
  return (
    <div className="App">
        <Front/>
        <Result/>
        <Upload/>
    </div>
  );
}

export default App;
