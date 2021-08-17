import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    templatecss:{
        padding:20,
        background:"gray",
    }
  }));

  export default function Template() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <Typography color="primary" className={classes.templatecss}>
                This is a template
            </Typography>
        </Container>
    );
  }