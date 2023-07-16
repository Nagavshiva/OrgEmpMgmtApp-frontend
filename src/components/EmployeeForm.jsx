/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  Modal,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import {
  createEmployeeAsync,
  updateEmployeeAsync,
} from "../features/employees/employeesSlice";
import { fetchOrganizationsAsync } from "../features/organizations/organizationsSlice";

const EmployeeForm = ({ open, handleOpen, employee }) => {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const { organizations } = useSelector((state) => state.organizations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrganizationsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (employee) {
      setName(employee.name);
      setDateOfBirth(dayjs(employee.dob));
      setPhoneNumber(employee.phoneNumber);
      setAddress(employee.address);
      setSelectedOrganization(employee.organization);
    }else {
      // Reset the form fields when employee prop is null
      setName("");
      setDateOfBirth(null);
      setPhoneNumber("");
      setAddress("");
      setSelectedOrganization("");
    }
  }, [employee]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !dateOfBirth || !phoneNumber || !address || !selectedOrganization) {
      setError("Please fill in all fields");
      return;
    }

    const employeeData = {
      name: name,
      dob: dateOfBirth.format("YYYY-MM-DD"),
      phoneNumber: phoneNumber,
      address: address,
      organization: selectedOrganization,
    };

    if (employee) {
      dispatch(
        updateEmployeeAsync({
          organizationId: selectedOrganization,
          employeeId: employee._id,
          updatedData: employeeData,
        })
      );
      setSuccessMessage("Employee updated successfully");
    } else {
      dispatch(
        createEmployeeAsync({
          organizationId: selectedOrganization,
          employeeData,
        })
      );
      setSuccessMessage("Employee created successfully");
    }

    setTimeout(() => {
      setName("");
      setDateOfBirth(null);
      setPhoneNumber("");
      setAddress("");
      setSelectedOrganization("");
      setError("");
      handleOpen();
      setSuccessMessage(""); // Clear the success message after closing the modal
    }, 2000); 
  };

  const handleFieldChange = () => {
    setError("");
    setSuccessMessage("");
  };

  return (
    <Modal
      open={open}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f7f7",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "80vh",
          backgroundColor: "#f2f7f7",
          width: "100%",
          maxWidth: "500px",
          margin: "0 auto",
          marginTop: "2rem",
          flexDirection: "column",
          "@media (max-width: 768px)": {
            height: "auto",
            padding: "1rem",
          },
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {employee ? "Update Employee" : "Create Employee"}
        </Typography>
        <FormControl
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            padding: "1rem",
            gap: "1rem",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              handleFieldChange();
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={dateOfBirth}
              onChange={(newValue) => {
                setDateOfBirth(newValue);
                handleFieldChange();
              }}
              renderInput={(props) => <TextField {...props} />}
            />
          </LocalizationProvider>
          <TextField
            label="Phone Number"
            sx={{
              gridColumn: "1 / span 2",
            }}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
              handleFieldChange();
            }}
          />
          <TextField
            label="Address"
            sx={{
              gridColumn: "1 / span 2",
              textAlign: "center",
            }}
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              handleFieldChange();
            }}
          />
          <Select
            sx={{ gridColumn: "1 / span 2" }}
            value={selectedOrganization}
            onChange={(e) => {
              setSelectedOrganization(e.target.value);
              handleFieldChange();
            }}
          >
            {organizations.map((organization) => (
              <MenuItem key={organization._id} value={organization._id}>
                {organization.name}
              </MenuItem>
            ))}
          </Select>
          {error && <Alert severity="error">{error}</Alert>}
          {successMessage && (
            <Snackbar
              open={true}
              autoHideDuration={3000}
              onClose={() => setSuccessMessage("")}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success">{successMessage}</Alert>
            </Snackbar>
          )}
          <Box
            sx={{
              gridColumn: "1 / span 2",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Button sx={{ marginLeft: "2.5rem" }} onClick={handleOpen}>
              Cancel
            </Button>
            <Button
              sx={{ marginLeft: "0.5rem" }}
              type="submit"
              onClick={handleSubmit}
            >
              {employee ? "Update" : "Create"}
            </Button>
          </Box>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default EmployeeForm;
