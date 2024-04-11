import React, { useState } from 'react';
import { TextField, Button, Grid, Slider, Typography, Table, TableContainer, TableHead, TableBody, TableCell, TableRow, Paper } from '@material-ui/core';
import { recommend } from '../services/ml.service';

const RecommendationComponent = () => {
  const [text, setText] = useState('');
  const [temperature, setTemperature] = useState(0.5);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleRecommendClick = async () => {
    setLoading(true);
    try {
      const responseData = await recommend(text, temperature);
      setResponse(responseData);
    } catch (error) {
      console.error('Error recommending:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12}>
          <TextField
            label="Text"
            variant="outlined"
            fullWidth
            multiline
            rows={5}
            value={text}
            onChange={handleTextChange}
            style={{ marginBottom: '20px' }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Typography>Temperature:</Typography>
            </Grid>
            <Grid item xs={8}>
              <Slider
                value={temperature}
                onChange={handleTemperatureChange}
                step={0.01}
                min={0}
                max={1}
                aria-labelledby="temperature-slider"
              />
            </Grid>
            <Grid item>
              <Typography>{temperature.toFixed(2)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleRecommendClick}>
            {loading ? 'Loading...' : 'Recommend'}
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ whiteSpace: 'pre-line' }}>
            {response.length > 0 && (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Score</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {response.map((data) => (
                      <TableRow key={data.id}>
                        <TableCell>{data.id}</TableCell>
                        <TableCell>{data.name}</TableCell>
                        <TableCell>{data.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default RecommendationComponent;
