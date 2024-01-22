import React from 'react';
import DataGridChart from '../components/DataGridChart';
import ResponsiveDrawer from '../components/ResponsiveDrawerLeft';
import DashBoardDeatils from '../components/DashBoardDeatils';

export default function Dashboard() {
  return (
    <div>
      <ResponsiveDrawer/>
      <DashBoardDeatils/>
    </div>
  );
}
