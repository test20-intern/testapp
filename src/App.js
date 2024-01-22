import "./App.css";
import CollectionReport from "./components/CollectionReport";
import DashBoardDeatils from "./components/DashBoardDeatils";
import DataGridPremiumDemo from "./components/DataGridChart";
import DuePolicies from "./components/DuePolicies";
import LapsedPolicies from "./components/LapsedPolicies";
import Login from "./components/Login";
import OverduePolicies from "./components/OverduePolicies";
import PolicyInquiry from "./components/PolicyInquiry";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/datagrid" element={<DataGridPremiumDemo />}></Route>
          <Route path="/policyinquiry" element={<PolicyInquiry />}></Route>
          <Route path="/lapsedpolicies" element={<LapsedPolicies />}></Route>
          <Route path="/overduepolicies" element={<OverduePolicies />}></Route>
          <Route path="/duepolicies" element={<DuePolicies />}></Route>
          <Route path="/collectionreport" element={<CollectionReport />}></Route>
          <Route path="/dashboarddetails" element={<DashBoardDeatils />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
