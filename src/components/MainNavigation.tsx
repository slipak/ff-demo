import {
  SupervisorAccount as SupervisorAccountIcon,
  Grade as GradeIcon,
  Group as GroupIcon,
} from "@mui/icons-material";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { ReactNode } from "react";
import { Link, useLocation, matchPath } from "react-router-dom";
import { useAppSelector } from "../app/store";
import { FEATURE_NAMES } from "../features/featureFlags/constants";
import { featureFlagConfigSelector } from "../features/featureFlags/featureFlagsSlice";

export const DRAWER_WIDTH = 240;

interface NavItem {
  title: string;
  url: string;
  icon: ReactNode;
  feature?: FEATURE_NAMES;
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    title: "Beers",
    icon: <SupervisorAccountIcon />,
    url: "/beers",
  },
  {
    title: "Favorite Beers",
    icon: <GradeIcon />,
    url: "/favorites",
    feature: FEATURE_NAMES.FAVORITES,
  },
  {
    title: "Users",
    icon: <GroupIcon />,
    url: "/users",
    feature: FEATURE_NAMES.USERS,
  },
];

const MainNavigation = () => {
  const location = useLocation();
  const isActive = (url: string) => {
    return Boolean(matchPath({ path: url, end: true }, location.pathname));
  };
  const features = useAppSelector(featureFlagConfigSelector);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto" }}>
        <List>
          {NAVIGATION_ITEMS.filter(
            ({ feature }) => !feature || features[feature]
          ).map(({ title, icon, url }, index) => (
            <ListItem key={`nav-${title}-${index}`} disablePadding>
              <ListItemButton
                selected={isActive(url)}
                component={Link}
                to={url}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default MainNavigation;
