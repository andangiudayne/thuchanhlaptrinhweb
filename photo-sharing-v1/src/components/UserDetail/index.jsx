import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Lấy thông tin user theo ID từ server [cite: 74, 83]
    fetchModel(`http://localhost:3000/user/${userId}`)
      .then((data) => setUser(data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!user) return <Typography>Loading user details...</Typography>;

  return (
    <Card variant="outlined" style={{ margin: '10px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {user.first_name} {user.last_name}
        </Typography>
        <Typography variant="body1"><strong>Location:</strong> {user.location}</Typography>
        <Typography variant="body1"><strong>Occupation:</strong> {user.occupation}</Typography>
        <Typography variant="body2" color="textSecondary" style={{ marginTop: '10px' }}>
          {user.description}
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to={`/photos/${user._id}`} 
          style={{ marginTop: '20px' }}
        >
          View Photos
        </Button>
      </CardContent>
    </Card>
  );
}

export default UserDetail;