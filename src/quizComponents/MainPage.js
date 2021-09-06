import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme,makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import {useHistory } from "react-router-dom";
import {SocketContext} from '../context/socket';
import React, {useState, useContext, useEffect} from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Home() {
  const classes = useStyles();
  const history = useHistory();
  const socket = useContext(SocketContext);
  const [courseCode, setCourseCode] = useState("CZ 3002");
  const [roomName, setRoomName] = useState('');
  const [isJoinRoom, setIsJoinRoom] = useState(false);
  

  useEffect(() => {
    // as soon as the component is mounted, do the following tasks:
    // subscribe to socket events
    socket.on("gameCode", (gameCode)=>{history.push("/lobby",{gameCode:gameCode});}); 

    return () => {
      // before the component is destroyed
      // unbind all event handlers used in this component
      console.log("socket off gamecode")
      socket.off("gameCode");
    };
  }, [socket,history]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const quizCourse = [
    "CZ 3002",
    "CZ 2001",
    "CZ 1001",
    "CZ 1002",
    "CZ 1003"
  ];
  return (
      <Container maxWidth="md" >
        <Grid style={isSmallScreen?{marginTop:20}:{ minHeight: '90vh' }} direction="column" container justify="center" alignItems="center">
          <Grid item direction="row" container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} container direction="column" justify="center" alignItems={isSmallScreen?"center":"flex-end"}>
              <div id="back-to-top-anchor" style={{textAlign:'center',width:250,marginRight:isSmallScreen?0:25}}>
                <SchoolIcon style={{ fontSize: 160 }}/>
                <Typography component="div">
                  <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" m={1}>
                  {courseCode} Quiz
                  </Box>
                  
                </Typography>
              </div>
              
            </Grid>
            <Grid item xs
            container
            direction="column"
            justify="center"
            alignItems={isSmallScreen?"center":"flex-start"}
            >
              <div style={{width:200,marginLeft:isSmallScreen?0:25}}>
                  <Autocomplete
                    id="combo-box-demo"
                    disableClearable
                    value={courseCode}
                    onChange={(event, newValue) => {
                      setCourseCode(newValue);
                    }}
                    options={quizCourse}
                    getOptionLabel={(option) => option}
                    style={{ width: 200 }}
                    renderInput={(params) => <TextField {...params} label="Select Course's Quiz" variant="outlined" />}
                  />
                  <Button onClick={()=>{socket.emit('randomGame',"USERNAME1",courseCode);}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}}>Random Room</Button>
                  <Button onClick={()=>{socket.emit('newGame',"USERNAME1",courseCode);}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}} >Create Room</Button>
                  {isJoinRoom && 
                  <TextField
                    onChange={(event)=>{setRoomName(event.target.value);}}
                    value={roomName}
                    label="Room Code" 
                    variant="outlined"
                    size="small"
                    style={{width:200,marginTop:20}}
                    />}
                  <Button onClick={()=>{if(isJoinRoom){socket.emit('joinGame',"USERNAME2",courseCode,roomName);}else{setIsJoinRoom(true);}}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}}>Join Room</Button>
                  
              </div>
                
            </Grid>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Home;
