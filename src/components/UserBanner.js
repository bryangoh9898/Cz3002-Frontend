import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    banner: {
        width:"100%",
        padding:theme.spacing(2),
    },
  }));

  export default function UserBanner(props) {
    const classes = useStyles();
    return (
        <Card square className={classes.banner}>
            <Typography variant="h5">
                <Box textAlign="center" fontWeight="fontWeightBold" m={1}>
                    {props.username}
                </Box>
            </Typography>
        </Card >
    );
  }