import { Link } from "react-router-dom";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchOrganizationsAsync } from "../features/organizations/organizationsSlice";

const OrganizationList = () => {
  const dispatch = useDispatch();

  const { organizations, loading, error } = useSelector(
    (state) => state.organizations
  );

  useEffect(() => {
    dispatch(fetchOrganizationsAsync());
  }, [dispatch]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 4, display: "flex", justifyContent: "center",flexDirection:'column',alignItems:'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Organization List
      </Typography>
      <TableContainer component={Paper} sx={{ width: "500px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
                  Organization Name
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ display: "block", maxHeight: "300px", overflowY: "scroll" }}>
            {organizations.map((organization) => (
              <TableRow key={organization._id}>
                <TableCell sx={{width:'500px',textAlign:'center'}}>
                  <Link
                    to={`/organizations/${organization._id}`}
                    style={{ textDecoration: "none"}}
                  >
                    {organization.name}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrganizationList;
