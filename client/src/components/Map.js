import React, { useState, useEffect } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

import { useMap } from "../context";
import PinIcon from "./PinIcon";
import Blog from "./Blog";

const initialViewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 14
};

const Map = ({ classes: { root, navigationControl } }) => {
  const [viewport, setViewport] = useState(initialViewport);
  const [userPosition, setUserPosition] = useState(null);

  const { draft, createDraft, updateDraft } = useMap();

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () =>
    "geolocation" in navigator &&
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      }
    );

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!draft) createDraft();

    const [longitude, latitude] = lngLat;

    updateDraft({ longitude, latitude });
  };

  return (
    <div className={root}>
      <ReactMapGL
        mapboxApiAccessToken="pk.eyJ1IjoiY2hyaXN0aG9waCIsImEiOiJjazU5cHJqb2cwZWJtM21uMzM0cW15czlzIn0.by-HeUKpsI2Q2dpu2JV7jg"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        height="calc(100vh - 64px)"
        width="100vw"
        onClick={handleMapClick}
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
      >
        <div className={navigationControl}>
          <NavigationControl
            onViewportChange={newViewport => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="red" />
          </Marker>
        )}
        {draft && (
          <Marker
            latitude={draft.latitude}
            longitude={draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}
      </ReactMapGL>
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: "flex"
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse"
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em"
  },
  deleteIcon: {
    color: "red"
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover"
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  }
};

export default withStyles(styles)(Map);
