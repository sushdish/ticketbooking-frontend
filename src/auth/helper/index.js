import { API } from "../../backend";

export const signup = (abc) => {
  console.log(abc, "4")
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(abc),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const adminSignup = (values) => {
  console.log(values, "4")
  return fetch(`${API}/adminsignup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAllAdmin = (userId, token, page) => {
  console.log(userId, "36")
  console.log(token, "37")
  console.log(page, "38")
  return fetch(`${API}/getAllAdmin/${userId}?page=${page + 1}`, {
    method: "GET",
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

export const statusChange = (userId, token, body, status) => {
  console.log(userId, "36")
  console.log(token, "37")
  console.log(body, "57")
  console.log(status, "58")

  return fetch(`${API}/status/update/${userId}/${status}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const signin = (values) => {
  console.log(values, "19")
  return fetch(`${API}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((user) => {
      return user.json();
    })
    .catch((err) => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = (next) => {
  if (typeof window !== undefined) {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET",
    })
      .then((response) => console.log("Signout success"))
      .catch((err) => console.log(err));
  }
};

export const isAuthenticated = () => {
  if (typeof window === undefined) return false;
  if (localStorage.getItem("jwt"))
    return JSON.parse(localStorage.getItem("jwt"));
  else return false;
};

export const isUser = () => {
  return isAuthenticated() && isAuthenticated().user.role === 0;
};

export const isAdmin = () => {
  return isAuthenticated() && isAuthenticated().user.role === 1;
};
