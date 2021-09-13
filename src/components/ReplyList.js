import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import ReplyCard from './ReplyCard';

// const useStyles = makeStyles((theme) => ({
//     templatecss:{
//         padding:20,
//         background:"gray",
//     }
//   }));

export default function ReplyList() {
  //const classes = useStyles();
  const posts = [
    {
      
      username: "blurgirl98",
      time: "4h ago",
      body: "So basically my reply i So basically my reply is So basically my reply is So basically my reply is So basically my reply is",
      upvoteNo: 154,
      downvoteNo: 21,
      upvoteBool: false,
      downvoteBool: true
    }
    ,
    {
        username: "blurgirl98",
        time: "4h ago",
        body: "So basically my reply i So basically my reply is So basically my reply is So basically my reply is So basically my reply isSo basically, what happened is my team and I are trying to develop a mobile app for this mod however my syst ",
        upvoteNo: 154,
        downvoteNo: 21,
        upvoteBool: false,
        downvoteBool: true
    }
    ,

  ];
  const listItems = posts.map((data) =>
    <ReplyCard data={data} />
  );
  return (
    <div>
      {listItems}
    </div>
  );
}