import React, { useEffect } from 'react';
import './App.css';
import { useDispatch  } from 'react-redux';
import InventoryDashboard from './components/InventoryDashboard';
import { fetchInitialData } from './redux/actions/fetchAction';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchInitialData());
  }, [dispatch]);

  return (
    <div className="App">
      <InventoryDashboard />
    </div>
  );
}

export default App;
