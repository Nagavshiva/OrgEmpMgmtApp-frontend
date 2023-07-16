import { Box, AppBar, Toolbar, Button, Typography } from "@mui/material";
import { useState } from "react";
import OrganizationForm from "./OrganizationForm";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const isRootPath = location.pathname === "/";

  return (
    <Box>
      <AppBar position="static" sx={{ backgroundColor: "#7f03fc" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <Typography variant="h7" component="div">
              Organization Tracker
            </Typography>
          </Link>
          {isRootPath && (
            <Button color="inherit" onClick={handleOpen}>
              Create Organization
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {open && (
        <OrganizationForm
          open={open}
          handleClose={handleClose}
          handleOpen={handleOpen}
        />
      )}
    </Box>
  );
};

export default Navbar;
