import React, { useState, useCallback } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import LandscapeIcon from "@material-ui/icons/LandscapeOutlined";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";

import { useMap } from "../../context";
import useGraphqlClient from "../../hooks/useGraphqlClient";
import { CREATE_PIN_MUTATION } from "../../graphql/mutations";

const CreatePin = ({
  classes: {
    form,
    alignCenter,
    iconLarge,
    input,
    button,
    contentField,
    leftIcon,
    rightIcon
  }
}) => {
  const { draft, deleteDraft } = useMap();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleOnChangeText = useCallback(
    ({ target: { value } }, callback) => callback(value),
    []
  );
  const handleOnChangeImage = useCallback(
    ({ target: { files } }, callback) => callback(files[0]),
    []
  );

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "geopins");
    data.append("cloud_name", "christhophcodes");

    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/christhophcodes/image/upload",
      data
    );

    return res.data.url;
  };

  const handleDiscardForm = useCallback(() => {
    deleteDraft();
    setTitle("");
    setImage("");
    setContent("");
  }, []);

  const handleSubmit = async e => {
    try {
      e.preventDefault();
      setSubmitting(true);
      const client = useGraphqlClient();
      const url = await handleImageUpload();
      const { latitude, longitude } = draft;
      const { createPin } = await client.request(CREATE_PIN_MUTATION, {
        title,
        image: url,
        content,
        latitude,
        longitude
      });
      console.log("createPin: ", createPin);
      handleDiscardForm();
    } catch (error) {
      setSubmitting(false);
      console.error("Error creating pin", error);
    } finally {
      if (submitting) setSubmitting(false);
    }
  };

  return (
    <form className={form}>
      <Typography
        className={alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        <LandscapeIcon className={iconLarge} /> Pin a location
      </Typography>
      <div>
        <TextField
          name="title"
          label="title"
          placeholder="Insert blog title"
          onChange={e => handleOnChangeText(e, setTitle)}
        />
        <input
          className={input}
          id="image"
          type="file"
          accept="image/*"
          onChange={e => handleOnChangeImage(e, setImage)}
        />
        <label htmlFor="image">
          <Button
            className={button}
            style={{ color: image ? "green" : "inherit" }}
            component="span"
            size="small"
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={contentField}>
        <TextField
          name="content"
          label="Content"
          margin="normal"
          variant="outlined"
          rows="6"
          onChange={e => handleOnChangeText(e, setContent)}
          fullWidth
          multiline
        />
      </div>
      <div>
        <Button
          className={button}
          onClick={handleDiscardForm}
          variant="contained"
          color="primary"
        >
          <ClearIcon className={leftIcon} />
          Discard
        </Button>
        <Button
          className={button}
          disabled={!title.trim() || !content.trim() || !image}
          onClick={handleSubmit}
          type="submit"
          variant="contained"
          color="secondary"
        >
          Submit
          <SaveIcon className={rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    height: "100%",
    minWidth: "300px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "0 1rem",
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "95%"
  },
  input: {
    display: "none"
  },
  alignCenter: {
    display: "flex",
    alignItems: "center"
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit,
    marginLeft: 0
  }
});

export default withStyles(styles)(CreatePin);
