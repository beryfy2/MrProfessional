import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import EmployeeDetail from "./pages/EmployeeDetail";
import Enquiries from "./pages/Enquiries";
import NavItems from "./pages/NavItems";
import AdminSettings from "./pages/AdminSettings";
import NavItemDetail from "./pages/NavItemDetail";
import TitleDetail from "./pages/TitleDetail";
import SubtitleDetail from "./pages/SubtitleDetail";
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
          <Route path="employees/:id" element={<EmployeeDetail />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="nav-items" element={<NavItems />} />
          <Route path="nav-items/:id" element={<NavItemDetail />} />
          <Route path="titles/:id" element={<TitleDetail />} />
          <Route path="subtitles/:id" element={<SubtitleDetail />} />
          <Route path="admin-settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
