import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData'; 

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split('/'); 
  const [contextText, setContextText] = useState('');
  
  
  const userId = pathParts[2];

  useEffect(() => {
    if (userId) {
      fetchModel(`/user/${userId}`)
        .then((user) => {
          const firstName = user.first_name ?? user.first ?? '';
          const lastName = user.last_name ?? user.last ?? '';

          if (pathParts[1] === 'users') {
            setContextText(`${firstName} ${lastName}`);
          } else if (pathParts[1] === 'photos') {
            setContextText(`Photos of ${firstName} ${lastName}`);
          }
        })
        .catch(() => setContextText(''));
    } else {
      setContextText('');
    }
  }, [userId, pathParts]); 

  return (
    <AppBar position="absolute" style={{ zIndex: 1201 }}>
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          Lê Nguyễn Ngọc An
        </Typography>
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;