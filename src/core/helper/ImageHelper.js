import React from "react";
import { API } from "../../backend";

const ImageHelper = ({ productId, className, width, height  }) => {
  // const defaultWidth = width || 15;
  // const defaultHeight = height || 15;

  const imgUrl = productId
    ? `${API}/product/photo/${productId}`
    : "https://images.pexels.com/photos/3577561/pexels-photo-3577561.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";
  return <img src={imgUrl} alt="Product Photo" className={className} />;
};

export default ImageHelper;
