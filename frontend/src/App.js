import './App.css';
import { Landing } from './components/Landing'
import { Sandwich } from './components/Sandwich'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="sandwich" element={<Sandwich />} />
      </Routes>
    </div>
  );
}

export default App;
