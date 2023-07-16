/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  createOrganizationAsync,
  updateOrganizationAsync,
} from "../features/organizations/organizationsSlice";
import {
  Box,
  Typography,
  TextField,
  Button,
  Modal,
  FormControl,
  IconButton,
  Alert,
  Snackbar
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CloseIcon from "@mui/icons-material/Close";

const OrganizationForm = ({ open, handleClose, organization }) => {
  const [name, setName] = useState("");
  const [registrationDate, setRegistrationDate] = useState(null);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (organization) {
      setName(organization.name);
      setRegistrationDate(dayjs(organization.registrationDate));
      setAddress(organization.address);
    }
  }, [organization]);

  const handleSubmit = async (e) => {
    e.preventDefault();

      // Validate form inputs
      if (!name || !registrationDate || !address) {
        setError("Please fill in all fields");
        return;
      }

    // Prepare the organization data from form inputs
    const organizationData = {
      name: name,
      registrationDate: registrationDate
        ? registrationDate.format("YYYY-MM-DD")
        : null,
      address: address,
    };

    try {
      
      // Check if organization already exists (for update)
      if (organization) {
        await dispatch(
          updateOrganizationAsync({ id: organization._id, organizationData })
        );
        setSuccessMessage("Organization updated successfully");
      } else {
        await dispatch(createOrganizationAsync(organizationData));
        setSuccessMessage("Organization created successfully");
      }


      // Reset the form inputs
      setName("");
      setRegistrationDate(null);
      setAddress("");

      setTimeout(() => {
        handleClose();
        setSuccessMessage(""); // Clear the success message after closing the modal
      }, 2000); 
    } catch (error) {
      console.error("Failed to save organization:", error);
    }
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
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: 400,
          p: 2,
          bgcolor: "#f2f9fa",
          borderRadius: "4px",
        }}
      >
        <IconButton
          sx={{
            alignSelf: "flex-end",
            marginBottom: "0.5rem",
          }}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }}>
          {organization ? "Update Organization" : "Create Organization"}
        </Typography>

        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            width: "100%",
          }}
        >
          <TextField
            label="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value) 
              handleFieldChange()
            }}
           
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Registration"
              value={registrationDate}
              onChange={(newValue) => {
                setRegistrationDate(newValue)
                handleFieldChange()
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            label="Address"
            value={address}
            onChange={(e) =>{
               setAddress(e.target.value)
               handleFieldChange()
              }}
          />
 {error && <Alert severity="error">{error}</Alert>}

 {successMessage && (
            <Snackbar
            open={!!successMessage}
              autoHideDuration={3000}
              onClose={() => setSuccessMessage("")}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert severity="success">{successMessage}</Alert>
            </Snackbar>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ alignSelf: "center", width: "50%" }}
            onClick={handleSubmit}
          >
            {organization ? "Update" : "Create"}
          </Button>
        </FormControl>
      </Box>
    </Modal>
  );
};

export default OrganizationForm;
