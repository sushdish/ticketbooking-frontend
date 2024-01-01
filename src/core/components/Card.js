import React, { useState } from 'react';
import ImageHelper from "../helper/ImageHelper";
import { addItemToCart } from "../helper/CartHelper";
import BookingModal from "./BookingModal"; 

const Card = ({ trip }) => {
console.log(trip, "94")
// const [currentTrip, setCurrentTrip] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    console.log("Modal is now open");
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    console.log('Closing modal'); // Add this line
    setShowModal(false);
  };

  const handleBookNow = (trip) => {

    console.log('Trip object before opening modal:', trip);
    // Logic for handling the booking (can be left empty for now)
    // ...
    // setCurrentTrip(trip);
    console.log("Book button clicked");
    // Open the modal when the user clicks "Book"
    openModal();
  };

  const { DestinationA, DestinationB, SeatCount, StartTime, EndTime, BaggageAllowance, TicketAmount, SeatType, TravelClass, Currency, PaymentType, RewardPoints } = trip.trips_details;

  return (
    <div className="card text-white bg-dark border-success mb-3">
      <ImageHelper
        tripId={trip._id}
        className="rounded card-img-top card-img"
      />
      <div class="card-body">
        <h5 class="card-title text-capitalize">{trip.name}</h5>
        <p class="card-text text-capitalize font-weight-light">
        <strong>Destination A:</strong> {DestinationA}<br />
          <strong>Destination B:</strong> {DestinationB}<br />
          <strong>Destination B:</strong> {DestinationB}<br />
          <strong>SeatCount:</strong> {SeatCount}<br />
          <strong>StartTime:</strong> {StartTime}<br />
          <strong>EndTime:</strong> {EndTime}<br />
          <strong>BaggageAllowance:</strong> {BaggageAllowance}<br />
          <strong>TicketAmount:</strong> {TicketAmount}<br />
          <strong>TravelClass:</strong> {TravelClass && Array.isArray(TravelClass) ? TravelClass.join(', ') : 'N/A'}<br />
          <strong>Seat Type:</strong> {(Array.isArray(SeatType) ? SeatType : [SeatType]).join(', ') || 'N/A'}<br />


          <strong>Currency:</strong> {Currency}<br />
          <strong>PaymentType:</strong> {PaymentType && Array.isArray(PaymentType) ? PaymentType.join(', ') : 'N/A'}<br />
          <strong>RewardPoints:</strong> {RewardPoints}<br />
        </p>
        <button href="#" className="btn btn-success" onClick={() => handleBookNow(trip)}>
            Book
                </button>
         {/* Modal */}
         {showModal && <BookingModal showModal={showModal} handleClose={closeModal} trip={trip} />}

      </div>
    </div>
  );
};

export default Card;