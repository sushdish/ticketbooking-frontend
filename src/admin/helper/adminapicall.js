import { API } from "../../backend";

/* Category */

export const createCategory = (userId, token, category) => {
  console.log(category, "100")
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getCategoryById = (categoryId) => {
  return fetch(`${API}/category/${categoryId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCategories = () => {
  return fetch(`${API}/categories`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateCategory = (categoryId, userId, token, category) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

/* Products */

export const createTrip = (userId, token, trip) => {
  console.log(trip, "EE")
  return fetch(`${API}/trip/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trip),
    
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getTripById = (tripId) => {
  console.log(tripId, "98")
  return fetch(`${API}/trip/${tripId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllTrip = () => {
  return fetch(`${API}/trips`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateTrip = (tripId, userId, token, trip) => {
  console.log(tripId, "97")
  return fetch(`${API}/trip/${tripId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(trip),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteTrip = (tripId, userId, token) => {
  return fetch(`${API}/trip/${tripId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json;
    })
    .catch((err) => console.log(err));
};

export const bookTrip = (userId, token,  values) => {
  console.log(values, "91")
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllBookings = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(booking),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const cancellation = (userId, token, requestBody) => {
  console.log(requestBody, "Reason")
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllCancellations = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(booking),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getPendingCancellations = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/pending/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(booking),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const adminReason = (userId, token, requestBody) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/update/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getSolvedRequest = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/solved/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(booking),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const refund = (userId, token, requestBody) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/refund/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUserCancellations = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/adminsolved/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify(booking),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};