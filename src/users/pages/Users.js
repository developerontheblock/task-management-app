import React from 'react';

import UsersList from "../components/UsersList";

const Users = () => {
  const USERS = [{id: 'u1', name: 'Alex', image: 'image', tasks: 3}]; //temporary dummy data
    return(
        <UsersList
        items={USERS}/>
    )
};

export default Users;
