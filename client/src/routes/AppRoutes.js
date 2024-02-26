// Routes.js
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login/Login';
import ClimbingRoutes from '../pages/Routes/Routes';
import ClimbingRoute from '../pages/Route/Route';
import Ascents from '../pages/Ascents/Ascents';
import Ascent from '../pages/Ascent/Ascent';
import NewAscent from '../pages/NewAscent/NewAscent';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/routes/:id" exact element={<ClimbingRoute />} />
      <Route path="/routes" exact element={<ClimbingRoutes />} />
      <Route path="/ascents/new" exact element={<NewAscent />} />
      <Route path="/ascents/:id" exact element={<Ascent />} />
      <Route path="/ascents" exact element={<Ascents />} />
    </Routes>
  );
}

export default AppRoutes;