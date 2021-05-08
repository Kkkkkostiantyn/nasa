import "./App.scss";
import { useState, useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FlightTakeoffRoundedIcon from "@material-ui/icons/FlightTakeoffRounded";
import AssistantPhotoRoundedIcon from "@material-ui/icons/AssistantPhotoRounded";
import FlightLandRoundedIcon from "@material-ui/icons/FlightLandRounded";
import QueryBuilderRoundedIcon from "@material-ui/icons/QueryBuilderRounded";
import Slider from "@material-ui/core/Slider";
import React from "react";
import Input from "@material-ui/core/Input";

function App() {
  const [rover, setRover] = useState(null);
  const [roverData, setRoverData] = useState([]);
  const [camera, setCamera] = useState(null);
  const [sol, setSol] = useState(0);
  const [photos, setPhotos] = useState([]);

  const key = "api_key = IS8tNjdFom9KZaHuJDDeBbqGxFN0hwKvY2KI9pR";

  const roverSelectHandler = (event) => {
    setRover(event.target.value);
    setCamera(null);
  };
  const cameraSelectHandler = (event) => {
    setCamera(event.target.value);
  };


  const solSliderHanlder = (event, newValue) => {
    setSol(newValue);
  };

  const solInputHandler = (event) => {
    setSol(event.target.value);
  };


  useEffect(() => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IS8tNjdFom9KZaHuJDDeBbqGxFN0hwKvY2KI9pRd"
    )
      .then((response) => response.json())
      .then((response) => {
        setRoverData(response.rovers);
        console.log(response.rovers);
      });
  }, []);

  const RoverSelect = (
    <FormControl>
      <Select
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        className="rover_select"
        displayEmpty
        value={rover}
        onChange={roverSelectHandler}
        label="Age">
        <MenuItem value={null} disabled>
          Select Rover Model
        </MenuItem>
        {roverData.map((e) => (
          <MenuItem value={e} key={e.id}>
            {e.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const RoverInfo =
    rover === null ? null : (
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FlightTakeoffRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Launch Date" secondary={rover.launch_date} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <FlightLandRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Landing Date" secondary={rover.landing_date} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AssistantPhotoRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Status" secondary={rover.status} />
        </ListItem>
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <QueryBuilderRoundedIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sols" secondary={rover.max_sol} />
        </ListItem>
      </List>
    );

  const CameraSelect =
    rover === null ? null : (
      <FormControl>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          className="camera_select"
          displayEmpty
          value={camera}
          onChange={cameraSelectHandler}
          label="Age">
          <MenuItem value={null} disabled>
            Select Camera
          </MenuItem>
          {rover.cameras.map((e) => (
            <MenuItem value={e} key={e.id}>
              {e.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );

  const SolSelect =
    camera === null ? null : (
      <div className="sol_select">
        <Slider
          value={sol}
          min={0}
          step={1}
          max={rover.max_sol}
          onChange={solSliderHanlder}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
        />
        <Input
          value={sol}
          margin="dense"
          onChange={solInputHandler}
          inputProps={{
            step: 1,
            min: 0,
            max: rover.max_sol,
            type: "number",
            "aria-labelledby": "input-slider",
          }}
        />
      </div>
    );

    const Photos = (<div className="photos_container">

    </div>);

  return (
    <div className="App">
      <header>Nasa</header>
      <div className="container">
        {RoverSelect}
        {RoverInfo}
        {CameraSelect}
        {SolSelect}
      </div>
    </div>
  );
}

export default App;
