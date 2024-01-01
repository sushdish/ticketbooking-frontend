export const addItemToCart = (item, next) => {
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      } 
  
      let alreadyExist = false;
  
      cart = cart.map((trip) => {
        if (item._id === trip._id) {
          alreadyExist = true;
          return { ...trip, count: trip.count + 1 };
        } else {
          return trip;
        }
      });
  
      if (!alreadyExist) {
        cart.push({ ...item, count: 1 });
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
      next();
    }
  };
  
  export const getAllCartItems = () => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("cart"));
    }
  };
  
  export const removeItemFromCart = (tripId) => {
    if (typeof window !== "undefined") {
      let cart = JSON.parse(localStorage.getItem("cart"));
      cart = cart.filter((item) => tripId !== item._id);
  
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };
  
  export const emptyCart = (next) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify([]));
      next && next();
    }
  };
  