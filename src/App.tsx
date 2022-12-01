import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// import routes
import Home from "./components/Home/Home";
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {

  const [passData, setPassData] = useState<any>()

  return (
    <>
        <Routes>
          <Route path="/" element={<Home setPassData={setPassData} />} />
          <Route path="register" element={<RegisterPage passData={passData} />} />
        </Routes>
    </>
  );
};

export default App;