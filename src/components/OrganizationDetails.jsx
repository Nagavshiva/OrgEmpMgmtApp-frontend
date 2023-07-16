import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  fetchOrganizationByIdAsync,
  deleteOrganizationAsync,
  updateOrganizationAsync,
} from "../features/organizations/organizationsSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Modal,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import OrganizationForm from "./OrganizationForm";


const OrganizationDetails = () => {

  const [openForm, setOpenForm] = useState(false);
  const { currentOrganization } = useSelector((state) => state.organizations);
 
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchOrganizationByIdAsync(id));
  }, [dispatch, id]);


  const handleDelete = () => {
    dispatch(deleteOrganizationAsync(currentOrganization._id))
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Failed to delete organization:", error);
      });
  };


  const handleUpdate = (id, organizationData) => {
    dispatch(updateOrganizationAsync({ id, organizationData }));
    setOpenForm(false);
  };

  
  const handleGoBack = () => {
    navigate('/')
  };
  const handleFormOpen = () => {
    setOpenForm(true);
  };

  return (
    <Modal
      open={true}
      aria-labelledby="child-modal-title"
      aria-describedby="child-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#f2f7f7",
          width: "400px",
          p: 2,
        }}
      >
        <CloseIcon
          onClick={() => navigate("/")}
          sx={{ display: "flex", cursor: "pointer" }}
        />
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Organization Details
        </Typography>
        <Card>
          <CardContent>
            {currentOrganization ? (
              <>
                <Typography variant="subtitle1">
                  ID: {currentOrganization._id}
                </Typography>
                <Typography variant="subtitle1">
                  Name: {currentOrganization.name}
                </Typography>
                <Typography variant="subtitle1">
                  Date of Registration:{" "}
                  {currentOrganization.registrationDate.substring(0, 10)}
                </Typography>
                <Typography variant="subtitle1">
                  Address: {currentOrganization.address}
                </Typography>
                <Typography variant="subtitle1">
                  Number of Employees: {currentOrganization.numberOfEmployees}
                </Typography>
              </>
            ) : (
              <Typography variant="subtitle1">Loading...</Typography>
            )}
            <Link
              to={`/employees/${currentOrganization?._id}/employees`}
              replace={true}
            >
              <Typography>List of Employees</Typography>
            </Link>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "1rem",
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={handleFormOpen}
              >
                Update
              </Button>
              <Link to="/">
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(currentOrganization._id)}
                >
                  Delete
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Card>
        <OrganizationForm
          open={openForm}
          handleOpen={handleFormOpen}
          handleUpdate={handleUpdate}
          organization={currentOrganization}
          handleClose={ handleGoBack}
        />
      </Box>
    </Modal>
  );
};

export default OrganizationDetails;
