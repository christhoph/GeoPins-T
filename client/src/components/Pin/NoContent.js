import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ExploreIcon from "@material-ui/icons/Explore";
import Typography from "@material-ui/core/Typography";

const NoContent = ({ classes: { root, icon } }) => (
  <div className={root}>
    <ExploreIcon className={icon} />
    <Typography
      component="h2"
      variant="h6"
      color="textPrimary"
      align="center"
      gutterBottom
      noWrap
    >
      Click on the map to add a pin
    </Typography>
  </div>
);

const styles = theme => ({
  root: {
    height: "100%",
    minWidth: "300px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 1rem"
  },
  icon: {
    margin: theme.spacing.unit,
    fontSize: "80px"
  }
});

export default withStyles(styles)(NoContent);
