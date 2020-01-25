import React from "react";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MapIcon from "@material-ui/icons/Map";
import Typography from "@material-ui/core/Typography";

import { useAuth } from "../context";
import Signout from "./Auth/Signout";

const Header = ({ classes: { root, grow, icon, picture } }) => {
  const {
    state: { currentUser }
  } = useAuth();

  return (
    <div className={root}>
      <AppBar position="static">
        <Toolbar>
          <div className={grow}>
            <MapIcon className={icon} />
            <Typography component="h1" variant="h6" color="inherit" noWrap>
              GeoPins
            </Typography>
          </div>
          {currentUser && (
            <div className={grow}>
              <img
                className={picture}
                src={currentUser.picture}
                alt={currentUser.name}
              />
              <Typography variant="h5" color="inherit" noWrap>
                {currentUser.name}
              </Typography>
            </div>
          )}
          <Signout />
        </Toolbar>
      </AppBar>
    </div>
  );
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center"
  },
  icon: {
    marginRight: theme.spacing.unit,
    color: "green",
    fontSize: 45
  },
  mobile: {
    display: "none"
  },
  picture: {
    height: "50px",
    borderRadius: "90%",
    marginRight: theme.spacing.unit * 2
  }
});

export default withStyles(styles)(Header);
