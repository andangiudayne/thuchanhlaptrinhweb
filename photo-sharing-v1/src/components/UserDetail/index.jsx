import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

function UserDetail() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // CHỈ truyền endpoint tương đối để fetchModel tự nối domain backend 
    fetchModel(`/user/${userId}`)
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
      });
  }, [userId]);

  if (!user) return <Typography>Loading user details...</Typography>;

  const firstName = user.first_name ?? user.first ?? '';
  const lastName = user.last_name ?? user.last ?? '';

  return (
    <Card variant="outlined" style={{ margin: '10px' }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {firstName} {lastName}
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