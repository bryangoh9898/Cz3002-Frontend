import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import UserCommentCard from './UserCommentCard';

// const useStyles = makeStyles((theme) => ({
//     templatecss:{
//         padding:20,
//         background:"gray",
//     }
//   }));

export default function UserCommentList(props) {
  const currentDate = new Date();

  const listItems = props.comments.map((data,index) =>
    <UserCommentCard key={data._id} data={data} currentDate={currentDate}/>
  );
  return (
    <div>
      {listItems}
    </div>
  );
}