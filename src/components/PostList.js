import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import PostCard from './PostCard';

// const useStyles = makeStyles((theme) => ({
//     templatecss:{
//         padding:20,
//         background:"gray",
//     }
//   }));

export default function PostList(props) {
  //const classes = useStyles();
  const currentDate = new Date();
  // const posts = [
  //   {
  //     course: "CZ3002",
  //     username: "blurboy98",
  //     time: "4h ago",
  //     title: "Have issues trying to install flutter. Does anyone know a solution?",
  //     body: "So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst...",
  //     upvoteNo: 154,
  //     downvoteNo: 21,
  //     upvoteBool: false,
  //     downvoteBool: true
  //   }
  //   ,
  //   {
  //     course: "CZ3002",
  //     username: "blurboy98",
  //     time: "4h ago",
  //     title: "Have issues trying to install flutter. Does anyone know a solution?",
  //     body: "So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst...",
  //     upvoteNo: 154,
  //     downvoteNo: 21,
  //     upvoteBool: true,
  //     downvoteBool: false
  //   }
  //   ,
  //   {
  //     course: "CZ3002",
  //     username: "blurboy98",
  //     time: "4h ago",
  //     title: "Have issues trying to install flutter. Does anyone know a solution?",
  //     body: "So basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst...",
  //     upvoteNo: 154,
  //     downvoteNo: 21,
  //     upvoteBool: false,
  //     downvoteBool: false
  //   }
  // ];
  const listItems = props.threads.map((data,index) =>
    <PostCard key={data._id} data={data} currentDate={currentDate}/>
  );
  return (
    <div>
      {listItems}
    </div>
  );
}