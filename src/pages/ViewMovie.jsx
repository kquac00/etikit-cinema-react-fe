import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

export default function ViewMovie() {
  const [movie, setMovie] = useState({});
  const [startTime, setStartTime] = useState(null);
  const [seat, setSeat] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    loadMovie();
  },);

  const loadMovie = async () => {
    const result = await axios.get(`http://localhost:8080/movie/data/${id}`);
    setMovie(result.data);

  };

  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    width: '100%',
    height: 'auto',
  });

  const handleStartTimeChange = (event) => {
    setStartTime(event.target.value);
  }

  const handleSeatChange = (event) => {
    setSeat(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ setSeat })
  }

  return (
    <>
      {/* =====================Main card with image and info the left=============== */}
      <div className="CardMarginT">
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 1300,
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={6} sx={{ textAlign: 'center' }}>
              <ButtonBase sx={{ width: '100%', height: 'auto' }}>
                <Img alt="movie image" src={movie.posterImage} style={{ objectFit: 'contain' }}
                  sx={{ maxWidth: '40%', maxHeight: '300px', float: 'right' }} />
              </ButtonBase>
            </Grid>
            <Grid item xs={6} container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h2" component="div">
                  {movie.title}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Movie Duration:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.duration} minutes
                </Typography>
                <Typography>
                  Room: {movie.room}
                </Typography>
                <Typography variant="h5">Select Seat:
                  <select type="text" name="seat" value={seat} onChange={handleSeatChange}>
                    <option hidden>--Select Seat--</option>
                    <option value="A1">A1 (front row)</option>
                    <option value="A2">A2 (front row)</option>
                    <option value="A3">A3 (front row)</option>
                    <option value="A4">A4 (front row)</option>
                    <option value="A5">A5 (front row)</option>
                    <option value="B1">B1 (middle row)</option>
                    <option value="B2">B2 (middle row)</option>
                    <option value="B3">B3 (middle row)</option>
                    <option value="B4">B4 (middle row)</option>
                    <option value="B5">B5 (middle row)</option>
                    <option value="C1">C1 (back row)</option>
                    <option value="C2">C2 (back row)</option>
                    <option value="C3">C3 (back row)</option>
                    <option value="C4">C4 (back row)</option>
                    <option value="C5">C5 (back row)</option>
                  </select>
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </div>
      {/************************* * Select Start time ************************/}
      <div>
        <div className="showtime">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Select Morning start time</Card.Title>
              <form onSubmit={handleSubmit}>
                <select value={startTime} onChange={handleStartTimeChange}>
                  <option value="">-- select start time --</option>
                  <option value="8:30 AM">8:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                </select>
                {seat && startTime && (
                  <Link to={`/payment?seat=${seat}&startTime=${startTime}&movieImage=${movie.posterImage}&movieTitle=${movie.title}&moviePrice=${movie.price}&movieRoom=${movie.room}`}>
                    <button className="btn btn-success">Proceed to Cart</button>
                  </Link>
                )}
              </form>
            </Card.Body>
          </Card>
        </div>
        <div className="showtime">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Select Afternoon start time</Card.Title>
              <form onSubmit={handleSubmit}>
                <select value={startTime} onChange={handleStartTimeChange}>
                  <option value="">-- Select start time --</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                </select>
                {seat && startTime && (
                  <Link to={`/payment?seat=${seat}&startTime=${startTime}&movieImage=${movie.posterImage}&movieTitle=${movie.title}&moviePrice=${movie.price}&movieRoom=${movie.room}`}>
                    <button className="btn btn-success">Proceed to Cart</button>
                  </Link>
                )}
              </form>
            </Card.Body>
          </Card>
        </div>
        <div className="showtime">
          <Card style={{ width: '18rem' }}>
            <Card.Body>
              <Card.Title>Select Evening start time</Card.Title>
              <form onSubmit={handleSubmit}>
                <select value={startTime} onChange={handleStartTimeChange}>
                  <option value="">-- Select start time --</option>
                  <option value="6:00 PM">6:00 PM</option>
                  <option value="8:00 PM">8:00 PM</option>
                </select>
                {seat && startTime && (
                  <Link to={`/payment?seat=${seat}&startTime=${startTime}&movieImage=${movie.posterImage}&movieTitle=${movie.title}&moviePrice=${movie.price}&movieRoom=${movie.room}`}>
                    <button className="btn btn-success">Proceed to Cart</button>
                  </Link>
                )}
              </form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
