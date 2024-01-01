import { API } from "../../backend";

export const createOrder = (userId, token, bookingData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ booking: bookingData }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getOrderTotal = (trips) => {
  let total = 0;
  trips.map((trip) => {
    total = total + trip.price * trip.count;
    return 0;
  });
  return total;
};
