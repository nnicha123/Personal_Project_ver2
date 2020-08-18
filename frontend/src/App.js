import React, { useState } from 'react';
import './App.css';
import PrivateRoutes from './components/private_routes/PrivateRoutes';
import LocalStorageService from './services/LocalStorageService'

function App() {

  const [role, setRole] = useState(LocalStorageService.getUserRole());
  // console.log(role)

  return (
    <div style={{ height: "100vh", margin: 0 }}>
      <PrivateRoutes role={role} setRole={setRole} />
    </div>
  );
}

export default App;
