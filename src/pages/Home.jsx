import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import "../Carousel.css";
import { Typography } from "@mui/material";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [currImg, setCurrImg] = useState(0);
  const carouselRef = useRef(null);

  const [showMore, setShowMore] = useState(false);
  const [visibleMovies, setVisibleMovies] = useState([]);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    const result = await axios.get("http://localhost:8080/movie/data");
    setMovies(result.data);
    setVisibleMovies(result.data.slice(0, 8));
  };

  const handleShowMore = () => {
    setShowMore(true);
    setVisibleMovies(movies);
  };



  return (
    // =============================Carousel display===================================
    <>
      <div className="carousel" ref={carouselRef}>
        {movies.map((movie, index) => (
          <div className="carouselInner" key={index}
            style={{ backgroundImage: `url(${movie.posterImage})` }}
            onClick={() => {
              window.location.href = `/viewmovie/${movie.id}`;
            }}>

            <div className="left" onClick={(e) => { e.stopPropagation(); currImg > 0 && setCurrImg(currImg - 1); carouselRef.current.scrollLeft -= carouselRef.current.offsetWidth }}>
              <ArrowBackIosIcon style={{ fontSize: 30 }} />
            </div>

            <div className="center">
            </div>

            <div className="right" onClick={(e) => { e.stopPropagation(); currImg < movies.length - 1 && setCurrImg(currImg + 1); carouselRef.current.scrollLeft += carouselRef.current.offsetWidth }}>
              <ArrowForwardIosIcon style={{ fontSize: 30 }} />
            </div>

          </div>
        ))}
      </div>


      {/* // ============================Display Movies playing =============================== */}
      <div className="container">
        <div className="row">
          {visibleMovies.map((movie, index) => (
            <div className="col-md-3 border rounded p-4 mt-2 shadow">
              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={movie.posterImage} height={350} style={{ objectFit: 'contain' }} />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>Duration: {movie.duration} minutes</Card.Text>
                  <Typography>
                    Price: ${movie.price}
                  </Typography>
                  <Button className="btn btn-warning">
                    <Link to={`/viewmovie/${movie.id}`}>Select</Link>
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
        {movies.length > 8 && !showMore && (
          <div className="text-center mt-3">
            <Button className="btn btn-primary" onClick={handleShowMore}>
              Show More
            </Button>
          </div>
        )}
      </div>
    </>
  );
}