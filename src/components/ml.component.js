import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Slider,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@material-ui/core";
import { recommend } from "../services/ml.service";

const RecommendationComponent = () => {
  const [text, setText] = useState("");
  const [temperature, setTemperature] = useState(0.5);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(5);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTemperatureChange = (event, newValue) => {
    setTemperature(newValue);
  };

  const handleRecommendClick = async () => {
    if (!text.trim()) {
      alert("Please enter text to get recommendations.");
      return;
    }
    setLoading(true);
    try {
      const requestData = {
        text: text,
        temperature: temperature.toString(),
        count: count.toString(),
      };
      const responseData = await recommend(requestData);
      setResponse(responseData.data);
    } catch (error) {
      console.error("Error recommending:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        paddingTop: "90px",
        width: "95%",
        margin: "auto",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
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
            style={{ marginBottom: "20px" }}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container alignItems="center" spacing={3}>
            <Grid item xs={8}>
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
                <Grid item xs={14}>
                  <Typography>{temperature.toFixed(2)}</Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={2}>
              <input
                type="text"
                inputMode="numeric"
                min={1}
                max={100}
                value={count}
                onChange={(e) => setCount(e.target.value)}
                placeholder="Count"
                className="inputNum"
                style={{ width: "50px", textAlign: "center" }}
                onKeyDown={(e) => {
                  if (
                    ![8, 9, 37, 39].includes(e.keyCode) &&
                    !/\d/.test(e.key)
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleRecommendClick}
                fullWidth
              >
                {loading ? "Loading..." : "Recommend"}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
            {response.length === 0 ? (
              <p>Please enter text to get recommendations.</p>
            ) : (
              <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Similarity</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.values(response).map((data, dataIndex) => (
                      <TableRow key={dataIndex}>
                        <TableCell>{data.userId_x}</TableCell>
                        <TableCell>{data.fullname}</TableCell>
                        <TableCell>{data.Similarity}</TableCell>
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
