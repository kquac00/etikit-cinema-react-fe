import React, { useState } from "react";
import "../Seat.css"

const movieOptions = [
    { value: "10", label: "Avengers: Endgame", price: 15 },
    { value: "12", label: "Joker", price: 12 },
    { value: "8", label: "Toy Story 4", price: 8 },
    { value: "9", label: "The Lion King", price: 9 },
];

const Seat = ({ status, onClick }) => (
    <div
        className={`seat ${status}`}
        onClick={() => status === "available" && onClick()}
    />
);

const App = () => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [movie, setMovie] = useState(movieOptions[0]);

    const handleSeatClick = (seatIndex) => {
        const newSelectedSeats = [...selectedSeats];
        newSelectedSeats.includes(seatIndex)
            ? newSelectedSeats.splice(newSelectedSeats.indexOf(seatIndex), 1)
            : newSelectedSeats.push(seatIndex);
        setSelectedSeats(newSelectedSeats);
    };

    const totalPrice = selectedSeats.length * movie.price;

    return (
        <div className="movie-theater">
            <div className="movie-container">
                <label>Pick a movie:</label>
                <select value={movie.value} onChange={(e) => setMovie(e.target.value)}>
                    {movieOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label} (${option.price})
                        </option>
                    ))}
                </select>
            </div>

            <ul className="showcase">
                <li>
                    <Seat status="available" />
                    <small>N/A</small>
                </li>

                <li>
                    <Seat status="selected" />
                    <small>Selected</small>
                </li>

                <li>
                    <Seat status="occupied" />
                    <small>Occupied</small>
                </li>
            </ul>

            <div className="container">
                <div className="screen"></div>

                {[...Array(6)].map((_, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {[...Array(8)].map((__, seatIndex) => (
                            <Seat
                                key={seatIndex}
                                status={
                                    selectedSeats.includes(seatIndex)
                                        ? "selected"
                                        : "available"
                                }
                                onClick={() => handleSeatClick(seatIndex)}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <p className="text">
                You have selected <span id="count">{selectedSeats.length}</span>{" "}
                seats for a price of $<span id="total">{totalPrice}</span>
            </p>
            <a href="/" className="btn btn-success">back home</a>
        </div>

    );
};

export default App;
