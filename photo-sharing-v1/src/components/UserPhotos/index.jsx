import React, { useState, useEffect } from 'react';
import { Typography, Card, CardMedia, CardContent, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import fetchModel from '../../lib/fetchModelData';

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState(null);

  useEffect(() => {
    fetchModel(`/photo/photosOfUser/${userId}`)
      .then((data) => {
        setPhotos(data); 
      })
      .catch((err) => console.error("Error fetching photos:", err));
  }, [userId]);

  if (!photos) return <Typography>Loading photos...</Typography>;

  const formatDate = (date) => new Date(date).toLocaleString();

  return (
    <div style={{ padding: '10px' }}>
      <Typography variant="h4" gutterBottom>User Photos</Typography>
      {photos.map((photo) => (
        <Card key={photo._id} style={{ marginBottom: '30px' }}>
          <CardMedia 
            component="img" 
           
            image={require(`../../images/${photo.file_name}`)} 
            alt={photo.file_name} 
          />
          <CardContent>
            <Typography variant="caption" display="block">
              Posted: {formatDate(photo.date_time)}
            </Typography>
            <Typography variant="h6" style={{ marginTop: '15px' }}>Comments</Typography>
            <Divider />
            <List>
              {photo.comments?.map((comment) => (
                <ListItem key={comment._id} alignItems="flex-start">
                  <ListItemText
                    primary={
                      <Link to={`/users/${comment.user._id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                        {comment.user.first_name ?? comment.user.first ?? ''} {comment.user.last_name ?? comment.user.last ?? ''}
                      </Link>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography component="span" variant="body2" color="textPrimary">
                          {formatDate(comment.date_time)}
                        </Typography>
                        {` — ${comment.comment}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default UserPhotos;