import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Enquiries from "./pages/Enquiries";
import NavItems from "./pages/NavItems";
import AdminSettings from "./pages/AdminSettings";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="nav-items" element={<NavItems />} />
          <Route path="admin-settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
