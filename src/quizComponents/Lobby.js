import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from "react-router-dom";
import React, {useState, useContext, useEffect,useRef} from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Tooltip from '@material-ui/core/Tooltip';
import { useLocation,useHistory } from "react-router-dom";
import {SocketContext} from '../context/socket';

function Lobby() {
  const socket = useContext(SocketContext);
  const location = useLocation();
  const history = useHistory();
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [gameState, setGameState] = useState({users:{}});
  const [chat, setChat] = useState([]);
  const messagesEndRef = useRef(null);
  const scrollToBottom = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }
  useEffect(()=>{scrollToBottom(messagesEndRef)}, [chat]);
  useEffect(()=>{
    if(gameState.round >0)
    {
      history.push("/game",{gameState:gameState,chat:chat,gameCode:location.state.gameCode});
    };
  },[gameState,chat,history,location.state])

  useEffect(() => {


    console.log("use effect");
    // as soon as the component is mounted, do the following tasks:
    socket.emit("getGameState");
    // subscribe to socket events
    socket.on("gameStateUpdate", (gameStateData)=>{setGameState(gameStateData)}); 

    socket.on("chat", (data)=>{
    setChat(chat=>[...chat,data])}); 
    socket.on("initialConnect", ()=>{history.push("/feed");}); 
    return () => {
      console.log("cleanup");
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("gameStateUpdate");
      socket.off("chat");
    };
  }, [socket,history]);
  if(location.state === undefined)
  {
    history.push("/quiz");
    return <div  ref={messagesEndRef}></div>;
  }
  return (
      <Container maxWidth="md" >
        <Grid style={isSmallScreen?{marginTop:20}:{ minHeight: '90vh' }} direction="column" container justify="center" alignItems="center">

        <Grid style={{padding:10,marginBottom:10}} item direction="row" container alignItems="center" justify="center">
            <Typography variant="h4">
              Code:
            </Typography>
            <Tooltip title="Copy" placement="top" arrow>
              <Button onClick={() => {navigator.clipboard.writeText(location.state.gameCode)}} variant="outlined" endIcon={<FileCopyIcon style={{ fontSize: 30 }}/>} style={{textTransform: 'none',marginInline:10}}>
                <Typography variant="h5">
                  {location.state.gameCode}
                </Typography>
              </Button>
            </Tooltip>
            
          </Grid>

          <Grid item direction="row" container justify="center" alignItems="center">
            <Grid item xs={12} sm={6} container direction="column" justify="center" alignItems={isSmallScreen?"center":"flex-end"}>
              <Paper elevation={3} style={{textAlign:'center',width:isSmallerThanMediumScreen?(isSmallScreen?"100%":300):350,marginRight:isSmallScreen?0:25}}>
                <Typography component="div">
                  <Box letterSpacing={6} fontSize="h5.fontSize" fontWeight="fontWeightBold" m={1}>
                  Players
                  </Box>
                  <List  style={{overflow: 'auto',height: 300}}>
                    {
                        Object.keys(gameState.users).map((key)=>{
                          let text = gameState.users[key].username;
                          if(socket.id === key)
                          {
                            text += " (You)";
                          }
                            return (
                                <ListItem key={key}>
                                    <ListItemText  primary={<Box color={gameState.users[key].color}>{text}</Box>} />
                                </ListItem>
                            );
                        })
                    }
                  </List >
                </Typography>
              </Paper>
              <Button onClick={()=>{socket.emit('leaveGame')}} component={Link} to="/quiz" size="medium" variant="contained" color="secondary" style={{width:isSmallerThanMediumScreen?(isSmallScreen?"100%":300):350,marginTop:20,marginBottom:isSmallScreen?20:0,marginRight:isSmallScreen?0:25}}>Leave Room</Button>
            </Grid>
            
            <Grid item xs={12} sm={6} container direction="column" justify="center" alignItems={isSmallScreen?"center":"flex-start"}>
              <Paper elevation={3} style={{textAlign:'center',width:isSmallerThanMediumScreen?(isSmallScreen?"100%":300):350,marginLeft:isSmallScreen?0:25}}>
                <Typography component="div">
                  <Box letterSpacing={6} fontSize="h5.fontSize" fontWeight="fontWeightBold" m={1}>
                  Chat
                  </Box>
                  <List  style={{overflow: 'auto',height: 240}}>
                    {
                        chat.map((value,index)=>{
                          return (
                            <ListItem key={index}>
                              <ListItemText  primary={<div style={{display:"flex",wordWrap: 'break-word'}}><Box color={value.color} style={{width:"100%"}}>{value.username+ ": "}<Box component="span" color="text.primary">{  value.msg}</Box></Box></div>} />
                            </ListItem>
                          );
                      })
                    }
                    <div ref={messagesEndRef} />
                  </List >
                </Typography>
                <form onSubmit={(e)=>{e.preventDefault();socket.emit('chat',message); setMessage('');}}>
                  <TextField
                      onChange={(event)=>{setMessage(event.target.value)}}
                      value={message}
                      label="Chat" 
                      variant="outlined"
                      size="small"
                      style={{width:isSmallerThanMediumScreen?(isSmallScreen?"90%":280):330,margin:10}}
                      />
                </form>
               
              </Paper>
              <Button onClick={()=>{socket.emit('startGame')}} size="medium" variant="contained" color="primary" style={{width:isSmallerThanMediumScreen?(isSmallScreen?"100%":300):350,marginTop:20,marginLeft:isSmallScreen?0:25}}>Start Game</Button>
              
            </Grid>
          </Grid>
        </Grid>
        
      </Container>
  );
}

export default Lobby;
