import React from "react";
import { GoogleLogin } from "react-google-login";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useAuth } from "../../context";
import useGraphqlClient from "../../hooks/useGraphqlClient";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes: { root, title } }) => {
  const { loginUser, setIsAuth } = useAuth();

  const onSuccess = async googleUser => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = useGraphqlClient(idToken);
      const { me } = await client.request(ME_QUERY);

      loginUser(me);
      setIsAuth(googleUser.isSignedIn());
    } catch (error) {
      onFailure(error);
    }
  };

  const onFailure = err => console.log(`Error logging in ${err}`);

  return (
    <div className={root}>
      <Typography
        className={title}
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="880941659357-8hq10t1dgsk3dc1f1birlq807u05mt4n.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        buttonText="Login with Google"
        theme="dark"
        isSignedIn
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    color: "rgba(66,133,244)"
  }
};

export default withStyles(styles)(Login);
