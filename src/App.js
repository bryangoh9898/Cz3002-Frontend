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
import {AudioContext, audManager} from './context/audio';
import {ProvideAuth} from './context/auth';
import PrivateRoute from './components/PrivateRoute';

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
      <ProvideAuth>
      <AudioContext.Provider value={audManager}>
      <SocketContext.Provider value={socket}>
        <Router>
          <Switch>
          <PrivateRoute path="/game">
              <Layout>
                <Game />
              </Layout>
            </PrivateRoute>
            <PrivateRoute path="/lobby">
              <Layout>
                <Lobby />
              </Layout>
            </PrivateRoute>
            <PrivateRoute path="/quiz">
              <Layout>
                <QuizMainPage />
              </Layout>
            </PrivateRoute>
            
            <PrivateRoute path="/post">
              <Layout>
                <Post />
              </Layout>
            </PrivateRoute>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/signin">
              <SignIn />
            </Route>
            <PrivateRoute path="/">
              <Layout>
                <Feed />
              </Layout>
            </PrivateRoute>
          </Switch>
        </Router>
      </SocketContext.Provider>
      </AudioContext.Provider>
      </ProvideAuth>
    </ThemeProvider>

  );
}

export default App;
