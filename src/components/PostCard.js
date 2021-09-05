import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    card:{
        padding:theme.spacing(1),
        marginTop:theme.spacing(2),
        paddingLeft:theme.spacing(2),
        minHeight:200,
        '&:hover': {
            backgroundColor: grey[100]
          },
        cursor:"pointer"
    },
  }));


  export default function PostCard(props) {
    const classes = useStyles();
    return (
        <Paper className={classes.card}>
            {props.data.title}
        </Paper>
    );
  }