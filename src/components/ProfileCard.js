import React, {useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import constants from '../Constants';
import axios from 'axios';
import { useAuth } from "../context/auth";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    templatecss:{
        padding:20,
    },
    card:{
        marginRight:theme.spacing(1),
        padding:theme.spacing(2),
        minHeight:100
    }
  }));

  export default function ProfileCard() {
    const classes = useStyles();
    const auth = useAuth();
    const [contributions, setContributions] = useState([]);

    useEffect(() => {
        let url = `${constants.URL}users/getUserContributionCount`;
        axios.get(url, {headers: {
            Authorization: `Bearer ${auth.token}`
          }})
            .then(function (response) {
              // handle success
              console.log(response.data);
              setContributions(response.data);
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
      }, [auth.token]);

    return (
        <Paper className={classes.card}>
            <Typography variant="body1">
                <Box textAlign="center" fontWeight="fontWeightBold" m={1}>
                    {auth.username}
                </Box>
            </Typography>
            <Typography variant="h5">
                <Box textAlign="center" m={1}>
                  Contributions: {contributions}
                </Box>
            </Typography>
        </Paper>
    );
  }