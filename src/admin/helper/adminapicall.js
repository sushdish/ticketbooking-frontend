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
  console.log(categoryId, "1")
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

export const updateCategory = (categoryId, userId, token, requestBody) => {
  return fetch(`${API}/category/${categoryId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));
};

/* Products */

export const createTrip = (userId, token, requestBody) => {
  console.log(requestBody, "EE")
  return fetch(`${API}/trip/create/${userId}`, {
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

export const getAllTrip = (page) => {
  console.log(page)
  return fetch(`${API}/trips?page=${page + 1}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

// return fetch(`${API}/trips?page=${page}`
export const getEveryTrip = () => {
  return fetch(`${API}/alltrips`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateTrip = (tripId, userId, token, requestBody) => {
  console.log(requestBody, "97")
  return fetch(`${API}/trip/${tripId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(requestBody),
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

export const bookTrip = (userId, token,  requestBody) => {
  console.log(requestBody, "91")
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/${userId}`, {
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

export const getPigination = (page) => {
  return fetch(`${API}/bookingpigination?page=${page}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllBookings = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/${userId}?page=${page + 1}`, {
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

export const getAllCancellations = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/allcancellation/${userId}?page=${page + 1}`, {
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

export const pigination = (page) => {
  return fetch(`${API}/pigination?page=${page}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getPendingCancellations = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  console.log(page, "237")
  return fetch(`${API}/cancellation/pending/${userId}?page=${page + 1}`, {
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
  console.log(requestBody, "257")
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

export const getSolvedRequest = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/solved/${userId}?page=${page + 1}`, {
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

export const getAdminResolvedReq = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/cancellation/adminsolved/${userId}?page=${page + 1}`, {
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

export const getAllConfig = () => {
  return fetch(`${API}/config`)
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const tripConfig = (categoryId, token) => {
  return fetch(`${API}/config/tripconfig/${categoryId}`, {
    method : "POST", 
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }) 
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getUserRewards = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/rewards/${userId}?page=${page + 1}`, {
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

export const getAllRefunds = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/refund/totalrefund/${userId}?page=${page + 1}`, {
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

export const getTotalRefund = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/refund/salestotalrefund/${userId}`, {
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

export const getTotalBookings = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/booking/totalrevenue/${userId}`, {
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

export const wallet = (userId, token, requestBody) => {
  console.log(token, "90")
  console.log(userId, "89")
  console.log(requestBody, "425")
  return fetch(`${API}/wallet/${userId}`, {
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

export const getTotalWallet = (userId, token) => {
  console.log(token, "90")
  console.log(userId, "89")
  return fetch(`${API}/wallet/totalwallet/${userId}`, {
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

export const bookOffer = (userId, token, requestBody) => {
  console.log(token, "90")
  console.log(userId, "89")
  console.log(requestBody, "425")
  return fetch(`${API}/bookoffer/create/${userId}`, {
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

export const getAllOffer = (userId, token, page) => {
  console.log(token, "90")
  console.log(userId, "89")
  console.log(page, "481")
  return fetch(`${API}/bookoffer/alloffer/${userId}?page=${page + 1}`, {
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

export const updateOffer = (userId, token, UpdatedofferDetails) => {
  console.log(token, "90")
  console.log(userId, "89")
  // console.log(requestBody, "425")
  console.log(UpdatedofferDetails, "500")
  return fetch(`${API}/bookoffer/update/${userId}/${UpdatedofferDetails._id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(UpdatedofferDetails),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};


export const getOfferById = (offerId) => {
  console.log(offerId, "1")
  return fetch(`${API}/bookoffer/offer/${offerId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};