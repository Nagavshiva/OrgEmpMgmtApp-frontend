import Navbar from "./components/Navbar";
import EmployeeList from "./components/EmployeeList";
import OrganizationList from "./components/OrganizationList";
import OrganizationDetails from "./components/OrganizationDetails";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<OrganizationList />} />
          <Route path="/employees/:organizationId/employees" element={<EmployeeList />} />
          <Route path="/employees" element={<EmployeeList />} />
          <Route
            exact
            path="/organizations/:id"
            element={<OrganizationDetails />}
          />
         
        </Routes>
      </Router>
    </>
  );
}

export default App;
