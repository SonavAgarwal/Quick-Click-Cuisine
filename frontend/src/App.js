import './App.css';
import { Landing } from './components/Landing'
import { Sandwich } from './components/Sandwich'
import { Sides } from './components/Sides'
import { ConfirmOrder } from './components/ConfirmOrder'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="sandwich" element={<Sandwich />} />
        <Route path="sides" element={<Sides />} />
        <Route path="confirmOrder" element={<ConfirmOrder />} />
      </Routes>
    </div>
  );
}

export default App;
