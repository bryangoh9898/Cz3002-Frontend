import React, { useState,useEffect } from 'react';
// import CreatePostButton from './CreatePostButton';
import UserTabs from './UserTabs';
import PostList from './PostList';
import axios from 'axios';
import constants from '../Constants';
import { useAuth } from "../context/auth";
import UserCommentList from './UserCommentList';


  export default function PostsFeed(props) {
    const auth = useAuth();
    const [threads, setThreads] = useState([]);
    const [comments, setComments] = useState([]);
    const [showPosts, setShowPosts] = useState(true);
  
    useEffect(() => {
        if(showPosts)
        {
            let url = `${constants.URL}users/getThreadForQuestionsPosted`;

            axios.get(url, {headers: {
            Authorization: `Bearer ${auth.token}`
            }})
            .then(function (response) {
                // handle success
                console.log(response.data);
                setThreads(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
        else{
            let url = `${constants.URL}users/getThreadForUserAnswersPosted`;

            axios.get(url, {headers: {
            Authorization: `Bearer ${auth.token}`
            }})
            .then(function (response) {
                // handle success
                const respComments = Object.values(response.data).map((item) => {return {...item[0],threadTitle:item[1],threadID:item[2]}});
                console.log(respComments);
                setComments(respComments);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        }
      
    }, [auth.token,showPosts]);

    return (
        <div>
            <UserTabs selectPosts={showPosts} setShowPosts={setShowPosts}/>
            {showPosts ? <PostList threads={threads}/> : <UserCommentList comments={comments}/>}
        </div>
    );
  }