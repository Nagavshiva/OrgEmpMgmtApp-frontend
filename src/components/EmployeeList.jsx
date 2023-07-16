import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";

import EmployeeForm from "./EmployeeForm";
import { fetchEmployeesAsync, updateEmployeeAsync, deleteEmployeeAsync } from "../features/employees/employeesSlice";

const EmployeeList = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null); // New state to track selected employee for update
  const dispatch = useDispatch();
  const { organizationId } = useParams();

  useEffect(() => {
    dispatch(fetchEmployeesAsync(organizationId));
  }, [dispatch, organizationId]);

  const employeesData = useSelector((state) => state.employees.organizations[organizationId]);
  const employees = employeesData?.employees || [];
  const loading = employeesData?.loading || false;
  const error = employeesData?.error || null;

  const handleOpen = () => {
    setSelectedEmployee(null); 
    setOpen(!open);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateEmployee = (employeeId) => {
    const employee = employees.find((emp) => emp._id === employeeId);
    setSelectedEmployee(employee);
    setOpen(true);
  };

  const handleDeleteEmployee = (employeeId) => {
    dispatch(deleteEmployeeAsync({ organizationId, employeeId }));
  };

  const handleFormSubmit = (employeeData) => {
    const { _id } = selectedEmployee;
    dispatch(updateEmployeeAsync({ organizationId, employeeId: _id, updatedData: employeeData }));
    setSelectedEmployee(null);
    setOpen(false);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  return (
    <Container>
      <Box>
        <Typography variant="h4" sx={{ textAlign: "center" }}>
          List Of Employees
        </Typography>
        <TextField
          label="Search"
          variant="outlined"
          sx={{
            width: "200px",
          }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="outlined"
          sx={{ padding: "0.9rem", marginLeft: "1rem" }}
          onClick={handleOpen}
        >
          Create
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{employee._id}</TableCell>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.dob.substring(0, 10)}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell>{employee.address}</TableCell>
                  <TableCell sx={{display:'flex',gap:'1rem'}}>
                    <Button variant="outlined" onClick={() => handleUpdateEmployee(employee._id)}>
                      Update
                    </Button>
                    <Button variant="outlined" onClick={() => handleDeleteEmployee(employee._id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EmployeeForm open={open} handleOpen={handleOpen} employee={selectedEmployee} onSubmit={handleFormSubmit} />
      </Box>
    </Container>
  );
};

export default EmployeeList;
