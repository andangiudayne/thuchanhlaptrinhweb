import './App.css';
import React, { useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";

const App = () => {
  const [topBarContext, setTopBarContext] = useState("");

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar contextText={topBarContext} />
          </Grid>
          <div className="main-topbar-buffer" />
          <Grid item sm={3}>
            <Paper className="main-grid-item" elevation={3}>
              <UserList />
            </Paper>
          </Grid>
          <Grid item sm={9}>
            <Paper className="main-grid-item" elevation={3} style={{ padding: '16px' }}>
              <Routes>
                <Route path="/" element={<Navigate to="/users" />} />
                <Route 
                  path="/users/:userId" 
                  element={<UserDetail setContext={setTopBarContext} />} 
                />
                <Route 
                  path="/photos/:userId" 
                  element={<UserPhotos setContext={setTopBarContext} />} 
                />
                <Route 
                  path="/users" 
                  element={<Typography variant="h5">Vui lòng chọn một người dùng.</Typography>} 
                />
              </Routes>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Router>
  );
};

export default App;