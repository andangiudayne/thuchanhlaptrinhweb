import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    fetchModel('/user/list')
      .then((data) => {
        setUsers(data); 
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <Typography variant="h6" gutterBottom style={{ padding: '10px' }}>
        Users
      </Typography>
      <List component="nav">
        {users.map((user) => (
          <React.Fragment key={user._id}>
            <ListItem button component={Link} to={`/users/${user._id}`}>
              <ListItemText primary={`${user.first_name} ${user.last_name}`} />
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>
    </div>
  );
}

export default UserList;