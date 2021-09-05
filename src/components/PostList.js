import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import PostCard from './PostCard';

// const useStyles = makeStyles((theme) => ({
//     templatecss:{
//         padding:20,
//         background:"gray",
//     }
//   }));

  export default function PostList() {
    //const classes = useStyles();
    const posts = [
    {title:"Have issues trying to install flutter. Does anyone know a solution?",
    body:"So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst..."}
    ,
    {title:"Have issues trying to install flutter. Does anyone know a solution?",
    body:"So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst..."}
    ,
    {title:"Have issues trying to install flutter. Does anyone know a solution?",
    body:"So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst..."}
    ];
    const listItems = posts.map((data) =>
    <PostCard data={data}/>
    );
    return (
       <div>
           {listItems}
       </div>
    );
  }