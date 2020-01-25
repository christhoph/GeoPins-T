import React from "react";
import { GoogleLogout } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ExitToApp from "@material-ui/icons/ExitToApp";

import { useAuth } from "../../context";

const Signout = ({ classes: { root, buttonText, buttonIcon } }) => {
  const { userSignout } = useAuth();

  const onSignout = () => userSignout();

  const renderSpan = ({ onClick }) => (
    <span className={root} onClick={onClick}>
      <Typography className={buttonText} variant="body1">
        Signout
      </Typography>
      <ExitToApp className={buttonIcon} />
    </span>
  );

  return <GoogleLogout onLogoutSuccess={onSignout} render={renderSpan} />;
};

const styles = {
  root: {
    cursor: "pointer",
    display: "flex"
  },
  buttonText: {
    color: "orange"
  },
  buttonIcon: {
    marginLeft: "5px",
    color: "orange"
  }
};

export default withStyles(styles)(Signout);
