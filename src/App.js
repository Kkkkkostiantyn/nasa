import "./App.scss";
import {useState, useEffect} from 'react';
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

function App() {
  const [rover, setRover] = useState(null);
  const [roverData, setRoverData] = useState([]);
  const handleChange = (event) => {
    setRover(event.target.value);
  };

    useEffect(() => {
        fetch(
          "https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=IS8tNjdFom9KZaHuJDDeBbqGxFN0hwKvY2KI9pRd"
        )
          .then((response) => response.json())
          .then((response) => {
            setRoverData(response.rovers);
            console.log(response.rovers)
          });
    }, [])

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
  ); ;
  return (
    <div className="App">
      <header>Nasa</header>
      <div className="container">
        <FormControl>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            className="rover_select"
            displayEmpty
            value={rover}
            onChange={handleChange}
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
        {RoverInfo}
      </div>
    </div>
  );
}

export default App;
