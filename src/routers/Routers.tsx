import { Routes, Route } from 'react-router-dom';
import Home from '../page/Home/Home';
import Signup from '../page/Signup/Signup';

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default Routers;
