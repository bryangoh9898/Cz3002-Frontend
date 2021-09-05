import React from 'react';
import Header from './Header';

export default function Layout (props) {
    return (
      <div>
        <Header/>
        <div className="content">
          {props.children}
        </div>
      </div>
    );
  }