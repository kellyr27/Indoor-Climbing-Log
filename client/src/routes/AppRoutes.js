// Routes.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login/Login';
import ClimbingRoutes from '../pages/Routes/Routes';
import ClimbingRoute from '../pages/Route/Route';
import Ascents from '../pages/Ascents/Ascents';
import Ascent from '../pages/Ascent/Ascent';
import NewAscent from '../pages/NewAscent/NewAscent';
import EditAscent from '../pages/EditAscent/EditAscent';
import Stats from '../pages/Stats/Stats';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route path="/routes/:id" exact element={<ClimbingRoute />} />
      <Route path="/routes" exact element={<ClimbingRoutes />} />
      <Route path="/ascents/new" exact element={<NewAscent />} />
      <Route path="/ascents/:id/edit" exact element={<EditAscent />} />
      <Route path="/ascents/:id" exact element={<Ascent />} />
      <Route path="/ascents" exact element={<Ascents />} />
      <Route path="/stats" exact element={<Stats />} />
      <Route path="/" element={<Navigate to="/ascents" />} />
    </Routes>
  );
}

export default AppRoutes;