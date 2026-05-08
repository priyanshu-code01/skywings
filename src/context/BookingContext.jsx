import React, { createContext, useState } from "react";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [seatClass, setSeatClass] = useState("Economy"); 

  return (
    <BookingContext.Provider
      value={{
        selectedFlight,
        setSelectedFlight,
        selectedSeat,
        setSelectedSeat,
        seatClass,
        setSeatClass,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
