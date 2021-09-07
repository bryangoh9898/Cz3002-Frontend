import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import GridListTile from '@material-ui/core/GridListTile';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import GridList from '@material-ui/core/GridList';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useLocation,useHistory } from "react-router-dom";
import {SocketContext} from '../context/socket';
import React, {useState, useContext, useEffect,useRef} from 'react';
import ClockIcon from '@material-ui/icons/AccessAlarm';
import {AudioContext} from '../context/audio';

function Game() {
  const socket = useContext(SocketContext);
  const audManager = useContext(AudioContext);
  const location = useLocation();
  const history = useHistory();
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmallerThanMediumScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [gameState, setGameState] = useState(location.state !== undefined ?location.state.gameState:{});
  const [chat, setChat] = useState(location.state !== undefined ?location.state.chat:[]);
  const rankingColors = ["gold","silver","#CD7F32","text.primary"];
  const rankingFontSize = ["h4.fontSize","h5.fontSize","h6.fontSize","body1.fontSize"]
  const messagesEndRef = useRef(null);
  const [rankings, setRankings] = useState([]);

  const scrollToBottom = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(()=>{scrollToBottom(messagesEndRef)}, [chat]);
  useEffect(
    ()=>{
      if(gameState.round >5)
      {
        socket.off("gameStateUpdate");
        setRankings(Object.values(gameState.users).sort((a,b)=>{return b.points - a.points}));
      }
    },[socket,gameState]
  )
  useEffect(() => {
    console.log("use effect");
    // as soon as the component is mounted, do the following tasks:

    // subscribe to socket events
    socket.on("sound", (sound)=>{audManager[sound].play(audManager.volume);});

    socket.on("gameStateUpdate", (gameStateData)=>{
      if(gameStateData.timer<6)
      {
        audManager.time.play(audManager.volume);
      }
      setGameState(gameStateData);});

    socket.on("chat", (data)=>{
    setChat(chat=>[...chat,data])});  
    socket.on("initialConnect", ()=>{history.push("/feed");}); 
    return () => {
      console.log("game cleanup");
      // before the component is destroyed
      // unbind all event handlers used in this component
      socket.off("gameCode");
      socket.off("gameStateUpdate");
      socket.off("chat");
      socket.off("sound");
    };
  }, [socket,history]);
  if(location.state === undefined)
  {
    history.push("/feed");
    return <div  ref={messagesEndRef}></div>;
  }
  return (
      <Container >
        <Grid style={isSmallScreen?{marginTop:20}:{ minHeight: '90vh' }} direction="column" container justify="center" alignItems="center">

          <Grid item direction="row" container justify="center" alignItems="center">
            <Grid item xs={12} sm={12} md={2} container direction="column" justify="center" alignItems={isSmallScreen?"center":"center"}>
              <Paper elevation={3} style={{textAlign:'center',width:"100%"}}>
                <Typography style={{display:"flex",flexDirection:"column",height:isSmallerThanMediumScreen?250:550}} component="div">
                  <Box letterSpacing={6} fontSize="h5.fontSize"  m={1}>
                  Players
                  </Box>
                  <List className="noScroll" style={{overflow: 'auto',flexGrow:1}}>
                    {
                      
                        Object.keys(gameState.users).map((key)=>{
                          let text = gameState.users[key].username;
                          if(socket.id === key)
                          {
                            text += " (You)";
                          }
                          
                            return (
                                <ListItem key={key}>
                                    <ListItemText primary={<Box color={gameState.users[key].color}>{text}</Box>}  secondary={"points:" + gameState.users[key].points}/>
                                </ListItem>
                            );
                        })
                    }
                  </List >
                </Typography>
              </Paper>
              
            </Grid>
            
            <Grid style={{paddingInline:isSmallerThanMediumScreen?0:15,marginTop:isSmallerThanMediumScreen?10:0,marginBottom:isSmallerThanMediumScreen?10:0}} item xs={12} sm={12} md={7} container direction="column" justify="center" alignItems="center">
              <Paper elevation={3} style={{textAlign:'center',width:"100%"}}>
                {gameState.round<=5?<div style={{display:"flex",flexDirection:"column",height:550}}>
                  <Typography style={{textAlign:'center',display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}} component="div">
                    <Box style={{flex:1}} fontSize="h5.fontSize" m={1}>
                    Question {gameState.round}/5
                    </Box>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"center",flex:1,textAlign:"center"}}>
                        <ClockIcon fontSize="large"/>
                        <Box color={gameState.timer>20?"success.main":gameState.timer>10 ?"warning.main":"secondary.main"}  fontSize="h5.fontSize" m={1}>
                    
                        {gameState.timer}s
                        </Box>
                    </div>
                    
                    
                  </Typography>
                  <Typography color="secondary"  component="div">
                    <Box style={{ wordWrap: 'break-word' }} fontSize="h2.fontSize" fontWeight="fontWeightBold" m={1}>
                    {gameState.qn.question} 
                    </Box>
                  </Typography>
                  <div style={{flexGrow:1}}>

                    </div>
                    <GridList spacing={0} cellHeight="auto" cols={2} style={{paddingBottom:5,overflow: 'auto',paddingInline:5,height:'auto'}}>
                      {
                          gameState.qn.answers.map((value,index)=>{
                              return (
                                <GridListTile style={{padding:2}}  key={index} cols={1}>
                                  <Button onClick={()=>{audManager.submit.play(audManager.volume);socket.emit('guess',index);}} disabled={gameState.users[socket.id].guessed} variant="contained" fullWidth style={{height:50}}>
                                    <Typography>
                                      {value}
                                    </Typography>
                                  </Button>
                                  
                                </GridListTile>
                              );
                          })
                      }
                    </GridList >
                    
                   
                  
                </div>
                :
                <div style={{display:"flex",flexDirection:"column",height:550}}>
                  <Typography style={{textAlign:'center',display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-around"}} component="div">
                    <Box fontSize="h5.fontSize" m={1}>
                    Round 5/5
                    </Box>
                    <Box fontSize="h5.fontSize" m={1}>
                    Game Over!
                    </Box>
                    
                    <Box style={{display:"flex",alignItems:"center"}} fontSize="h5.fontSize" m={1}>
                    <ClockIcon fontSize="large"/>
                     0s
                    </Box>
                  </Typography>
                  <Typography component="div">
                    <Box style={{ wordWrap: 'break-word' }} color="secondary.main" fontSize="h3.fontSize" fontWeight="fontWeightBold" m={1}>
                    Results!
                    </Box>
                    
                  </Typography>
                  <GridList spacing={3} cellHeight="auto" cols={isSmallScreen?2:3} style={{overflow: 'auto',paddingInline:5,height:'auto'}}>
                      {
                          rankings.map((value,index)=>{
                            let colorFontSizeIndex = index<=2?index:3;
                              return (
                                <GridListTile  key={index} cols={1}>
                                    <Typography style={{height:"100%",display:"flex",flexDirection:"column",justifyContent:"flex-end"}} component="div">
                                      <Box style={{wordWrap: 'break-word' }} color={rankingColors[colorFontSizeIndex]} fontSize={rankingFontSize[colorFontSizeIndex]} fontWeight="fontWeightBold">
                                      #{(index+1)+ " "+ value.username}
                                      </Box>
                                    </Typography>
                                </GridListTile>
                              );
                          })
                      }
                    </GridList>
                    <div style={{display:"flex",flexDirection:"column",justifyContent:"flex-end",flexGrow:1,padding:10}}>
                        <Button onClick={()=>{history.push("/lobby",{gameCode:location.state.gameCode});}} size="medium" variant="contained" color="secondary" style={{width:"100%"}}>Return to lobby</Button>
                    </div>
                    
                </div>
                }
                
                
               
              </Paper>
              
            </Grid>

            <Grid item xs={12} sm={12} md={3} container direction="column" justify="center" alignItems={isSmallScreen?"center":"flex-end"}>
              <Paper elevation={3} style={{textAlign:'center',width:"100%"}}>
                <Typography style={{display:"flex",flexDirection:"column",height:isSmallerThanMediumScreen?300:550}}  component="div">
                  <Box letterSpacing={6} fontSize="h5.fontSize" m={1}>
                  Chat
                  </Box>
                  <List  style={{overflowX:'hidden',overflowY: 'auto',flexGrow:1}}>
                    {
                        chat.map((value,index)=>{
                          if(value.username.length ===0)
                          {
                            return (
                              <ListItem key={index}>
                                  <ListItemText  primary={<div style={{display:"flex",wordWrap: 'break-word'}}><Box color={value.color} style={{width:"100%"}}>{value.msg}</Box></div>} />
                              </ListItem>
                            )
                          }
                          return (
                              <ListItem key={index}>
                                  <ListItemText  primary={<div style={{display:"flex",wordWrap: 'break-word'}}><Box color={value.color} style={{width:"100%"}}>{value.username+ ": "}<Box component="span" color="text.primary">{  value.msg}</Box></Box></div>} />
                              </ListItem>
                          );
                      })
                    }
                    <div ref={messagesEndRef} />
                  </List >
                  <form style={{padding:10}} onSubmit={(e)=>{e.preventDefault();socket.emit('chat',message); setMessage('');}}>
                  <TextField
                      onChange={(event)=>{setMessage(event.target.value)}}
                      value={message}
                      label="Chat" 
                      variant="outlined"
                      size="small"
                      style={{width:"100%"}}
                      />
                </form>
                </Typography>
               
               
              </Paper>
              
            </Grid>
          </Grid>
        </Grid>
        
      </Container>
  );
}

export default Game;
