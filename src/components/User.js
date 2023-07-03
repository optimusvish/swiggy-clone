import React, { useState } from 'react';

const User = (props) => {
    const [count, setCount] = useState(0);
    const [count1, setCount1] = useState(1);
    console.log('child 1 render');
  return (
    <div className="user-card">
        <h1>Count1 (function): {count} </h1>
        <h1>Count2 (function): {count1} </h1>
        <h2>Name: {props.name}</h2>
        <h2>Location: Kurnool</h2>
        <h2>Contact: @optimusvish</h2>
    </div>
  );
}

export default User;
