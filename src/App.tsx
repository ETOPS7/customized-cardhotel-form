import React, { useState } from "react";
import "./App.css";
import Card from "./components/Card/Card";
import HotelForm from "./components/HotelForm";

export interface ICard {
  rate: number;
  name: string;
  location: string;
  price: number;
  id: number;
  isFav: boolean;
}

const initialHotels: ICard[] = [
  {
    rate: 4.9,
    name: "The Malta Hotel",
    location: "Italy, EU",
    price: 1400,
    id: 1,
    isFav: false,
  },
  {
    rate: 3.4,
    name: "The Boston Hotel",
    location: "Boston, MA",
    price: 1800,
    id: 2,
    isFav: false,
  },
];

function App() {
  const [hotels, setHotels] = useState(initialHotels);
  const handleToggleFav = (id: number) => {
    const updHotels = hotels.map((hotel) =>
      hotel.id === id ? { ...hotel, isFav: !hotel.isFav } : hotel
    );
    setHotels(updHotels);
  };

  const addHotel = (values: Omit<ICard, "id" | "isFav">) => {
    const hotel = { ...values, isFav: false, id: hotels[hotels.length - 1].id+1 };
    setHotels([...hotels, hotel]);
  };

  return (
    <div className="App">
      <div style={{ display: "flex", flexDirection: "row", gap: "2em" }}>
        {hotels.map((hotel) => {
          return (
            <Card
              key={hotel.id}
              rate={hotel.rate}
              name={hotel.name}
              location={hotel.location}
              price={hotel.price}
              id={hotel.id}
              isFav={hotel.isFav}
              toggleFav={handleToggleFav}
            />
          );
        })}
      </div>
      <HotelForm addHotel={addHotel}/>
    </div>
  );
}

export default App;
