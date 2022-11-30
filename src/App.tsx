
import { Routes, Route, Router } from 'react-router-dom';

import Home from "./components/Home/Home";
import RegisterPage from './components/RegisterPage/RegisterPage';
function App() {

  return (
    <>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="registration" element={<RegisterPage />} />
        </Routes>
    </>
  );
}

export default App;