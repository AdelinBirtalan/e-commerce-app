import product1 from "./assets/iphone.jpg";
import product2 from "./assets/computer.jpg";
import product3 from "./assets/earbuds.jpg";
import product4 from "./assets/headset.jpg";
import product5 from "./assets/macbook.jpg";
import product6 from "./assets/powerbank.jpg";
import product7 from "./assets/watch.jpg";
import product8 from "./assets/webcam.jpg";
import product9 from "./assets/camera.jpg";
import { Heart } from "phosphor-react";

export const PRODUCTS = [
  {
    id: 1,
    productName: "IPhone",
    price: 999.0,
    productImage: product1,
    productWish: <Heart size={32} />,
  },
  {
    id: 2,
    productName: "Desktop Computer",
    price: 1299.0,
    productImage: product2,
    productWish: <Heart size={32} />,
  },
  {
    id: 3,
    productName: "Wireless Earbuds",
    price: 59.99,
    productImage: product3,
    productWish: <Heart size={32} />,
  },
  {
    id: 4,
    productName: "Gaming Headset",
    price: 79.99,
    productImage: product4,
    productWish: <Heart size={32} />,
  },
  {
    id: 5,
    productName: "MacBook Laptop",
    price: 1499.0,
    productImage: product5,
    productWish: <Heart size={32} />,
  },
  {
    id: 6,
    productName: "10000mAh Power Bank",
    price: 29.99,
    productImage: product6,
    productWish: <Heart size={32} />,
  },
  {
    id: 7,
    productName: "Smart Fitness Watch",
    price: 89.99,
    productImage: product7,
    productWish: <Heart size={32} />,
  },
  {
    id: 8,
    productName: "1080p Webcam",
    price: 39.99,
    productImage: product8,
    productWish: <Heart size={32} />,
  },
  {
    id: 9,
    productName: "Digital Audio Recorder",
    price: 99.99,
    productImage: product9,
    productWish: <Heart size={32} />,
  },
];
