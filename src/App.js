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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function App() {
  const [rover, setRover] = useState(null);
  const [roverData, setRoverData] = useState([]);
  const [camera, setCamera] = useState(null);
  const [sol, setSol] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const roverSelectHandler = (event) => {
    setRover(event.target.value);
    setCamera(null);
    setSol(0);
    setPhotos([]);
  };
  const cameraSelectHandler = (event) => {
    setCamera(event.target.value);
    setSol(0);
    setPhotos([]);
  };

  const solSliderHanlder = (event, newValue) => {
    setSol(newValue);
  };

  const solInputHandler = (event) => {
    setSol(event.target.value);
  };

  const loadMoreHandler = () => {
    setPageCount(prev => {
      fetchPhotos(prev + 1);
      return(prev + 1);
    });
  }

  const fetchRovers = () => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IS8tNjdFom9KZaHuJDDeBbqGxFN0hwKvY2KI9pRd"
    )
      .then(response => response.json())
      .then(response => setRoverData(response.rovers))
      .catch(error => alert("Error occured: " + error));
  };

  const fetchPhotos = (page = 1) => {
    fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.name}/photos?sol=${sol}&camera=${camera.name}&page=${page}&api_key=IS8tNjdFom9KZaHuJDDeBbqGxFN0hwKvY2KI9pRd`
    )
      .then(response => response.json())
      .then(response => {
        setPhotos((prev) => prev.concat(response.photos));
        if (page > 1 && response.photos.length === 0) {
          alert("Last Page");
        }
      })
      .catch(error => alert("Error occured: " + error));
  };

  useEffect(() => {
    fetchRovers();
  }, []);

  useEffect(() => {
    setPhotos([]);
    setPageCount(1);
    if (sol > 0) {
      fetchPhotos();
    }
  }, [sol]);

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
        <div className="sol_controls-wrapper">
          <Slider
            value={sol}
            min={0}
            step={1}
            max={rover.max_sol}
            onChange={solSliderHanlder}
            valueLabelDisplay="auto"
            aria-labelledby="non-linear-slider"
          />
          <TextField
            id="outlined-number"
            label="Sol"
            type="number"
            value={sol}
            onChange={solInputHandler}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </div>
      </div>
    );

  const Photos =
    sol < 1 ? null : photos.length === 0 ? (
      <div>There are no photos for selected sol</div>
    ) : (
      <>
        <div className="photos">
          {photos.map((e) => (
            <img className="photo" key={e.id} src={e.img_src} />
          ))}
        </div>
        {photos.length < 24 ? null : (
          <Button onClick={loadMoreHandler} className="loadMoreButton" variant="contained" color="primary">
            Load More
          </Button>
        )}
      </>
    );

  return (
    <div className="App">
      <header></header>
      <div className="container">
        {RoverSelect}
        {RoverInfo}
        {CameraSelect}
        {SolSelect}
        {Photos}
      </div>
    </div>
  );
}

export default App;
