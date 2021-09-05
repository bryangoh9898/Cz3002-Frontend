import React from 'react';
import CreatePostButton from './CreatePostButton';
import FilterPost from './FilterPosts';
import PostList from './PostList';
  export default function PostsFeed() {
    return (
        <div>
            <CreatePostButton/>
            <FilterPost/>
            <PostList/>
        </div>
    );
  }