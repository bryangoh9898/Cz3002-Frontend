import SchoolIcon from '@material-ui/icons/School';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import {useHistory } from "react-router-dom";
import {SocketContext} from '../context/socket';
import React, {useState, useContext, useEffect} from 'react';

function Home() {
  const history = useHistory();
  const socket = useContext(SocketContext);
  const audManager = useContext(AudioContext);
  const [usernameError, setUsernameError] = useState(false);
  const [username, setUsername] = useState('');
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
  const validUsername = ()=>{
    if(username.length === 0)
    {
      setUsernameError(true);
      return false;
    }
    setUsernameError(false);
    return true;
  };
  return (
      <Container maxWidth="md" >
        <Grid style={isSmallScreen?{marginTop:20}:{ minHeight: '100vh' }} direction="column" container justify="center" alignItems="center">
          <Grid item direction="row" container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} container direction="column" justify="center" alignItems={isSmallScreen?"center":"flex-end"}>
              <div id="back-to-top-anchor" style={{textAlign:'center',width:250,marginRight:isSmallScreen?0:25}}>
                <SchoolIcon style={{ fontSize: 160 }}/>
                <Typography component="div">
                  <Box fontSize="h4.fontSize" fontWeight="fontWeightBold" m={1}>
                  CZ3002 Quiz
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
                  <TextField
                    error={usernameError}
                    onChange={(event)=>{if(event.target.value.length<33)setUsername(event.target.value);}}
                    value={username}
                    label="Username" 
                    variant="outlined"
                    size="small"
                    style={{width:200}}
                    helperText={usernameError?"Username not filled":""}
                    />
                  <Button onClick={()=>{audManager.click.play(audManager.volume);if(validUsername()){socket.emit('randomGame',username);}}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}}>Random Room</Button>
                  <Button onClick={()=>{audManager.click.play(audManager.volume);if(validUsername()){socket.emit('newGame',username);}}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}} >Create Room</Button>
                  {isJoinRoom && 
                  <TextField
                    onChange={(event)=>{setRoomName(event.target.value);}}
                    value={roomName}
                    label="Room Code" 
                    variant="outlined"
                    size="small"
                    style={{width:200,marginTop:20}}
                    />}
                  <Button onClick={()=>{audManager.click.play(audManager.volume);if(isJoinRoom && validUsername()){socket.emit('joinGame',username,roomName);}else{setIsJoinRoom(true);}}} color="primary" size="medium" variant="contained" style={{width:200,marginTop:20}}>Join Room</Button>
                  
              </div>
                
            </Grid>
          </Grid>
        </Grid>
      </Container>
  );
}

export default Home;
