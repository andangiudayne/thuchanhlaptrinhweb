import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import models from '../../modelData/models';

function TopBar() {
  const location = useLocation();
  const pathParts = location.pathname.split('/'); // Cắt URL để lấy thông tin
  
  let contextText = '';

  // Xác định ngữ cảnh dựa trên URL
  if (pathParts[1] === 'users' && pathParts[2]) {
    const user = models.userModel(pathParts[2]);
    if (user) contextText = `${user.first_name} ${user.last_name}`;
  } else if (pathParts[1] === 'photos' && pathParts[2]) {
    const user = models.userModel(pathParts[2]);
    if (user) contextText = `Photos of ${user.first_name} ${user.last_name}`;
  }

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="inherit">
          {/* Nhớ đổi dòng này thành tên thật của bạn nhé! */}
          Your Name Here 
        </Typography>
        <Typography variant="h6" color="inherit">
          {contextText}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;