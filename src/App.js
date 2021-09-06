import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Feed from "./components/Feed";
import Post from "./components/Post";
import Layout from "./components/Layout";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SocketContext, socket } from './context/socket';
import QuizMainPage from './quizComponents/MainPage';
import Lobby from './quizComponents/Lobby';
import Game from './quizComponents/Game';

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    background: {
      default: grey[100],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline></CssBaseline>
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
          <Route path="/game">
              <Layout>
                <Game />
              </Layout>
            </Route>
            <Route path="/lobby">
              <Layout>
                <Lobby />
              </Layout>
            </Route>
            <Route path="/quiz">
              <Layout>
                <QuizMainPage />
              </Layout>
            </Route>
            <Route path="/feed">
              <Layout>
                <Feed />
              </Layout>
            </Route>
            <Route path="/post">
              <Layout>
                <Post />
              </Layout>
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      </SocketContext.Provider>
    </ThemeProvider>

  );
}

export default App;
