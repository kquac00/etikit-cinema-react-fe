import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ProcessPayment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const seat = queryParams.get('seat');
  const movieRoom = queryParams.get('movieRoom');
  const startTime = queryParams.get('startTime');
  const movieImage = queryParams.get('movieImage');
  const movieTitle = queryParams.get('movieTitle');
  const moviePrice = queryParams.get('moviePrice');

  const handleSuccess = () => {
    toast.success("Payment succesful!");
    setTimeout(() => {
      window.location.replace('/');
    }, 4000);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: "40px" }}>

      <Card Card sx={{ maxWidth: 400 }}>
        <Typography>
          <h1><strong>{movieTitle}</strong></h1>
        </Typography>
        <CardMedia
          sx={{ height: 300 }}
          src={movieImage}
          component="img"
          style={{ objectFit: 'contain' }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <p>Room: {movieRoom}</p>
            <p>Selected Seat: {seat}</p>
            <p>Selected Start Time: {startTime}</p>
            <p>Price: ${moviePrice}</p>
          </Typography>
          <Typography variant="body2" color="text.secondary">
          </Typography>
        </CardContent>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ToastContainer />
          <CardActions>
            <button className='btn btn-success' onClick={handleSuccess}>Make Payment</button>
            <a className="btn btn-danger" href="/">Cancel</a>
          </CardActions>
        </div>
      </Card>
    </div >
  );
};

export default ProcessPayment;
