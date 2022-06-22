import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MainNavigation from "./MainNavigation";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/store";
import { AccountCircle } from "@mui/icons-material";
import { useState } from "react";
import { logOut } from "../features/auth/authSlice";

const PageLayout = () => {
  const dispatch = useAppDispatch();
  const loggedUser = useAppSelector((store) => store.auth.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(logOut());
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: "100%" }}
            alignItems="center"
          >
            <Typography variant="h6" noWrap component="div">
              Feature Toggles
            </Typography>

            {loggedUser && (
              <Stack direction="row" alignItems="center">
                <Typography variant="subtitle1" noWrap component="div">
                  {loggedUser.name}
                </Typography>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Stack>
            )}
          </Stack>
        </Toolbar>
      </AppBar>
      <MainNavigation />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default PageLayout;
