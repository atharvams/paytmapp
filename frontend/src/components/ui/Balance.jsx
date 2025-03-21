import React, { useEffect, useState } from "react";
import axios from "axios";

function Balance() {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        const balanceValue = parseFloat(response.data.balance);
        setBalance(isNaN(balanceValue) ? "0.00" : balanceValue.toFixed(2));
      });
  }, []);

  return (
    <div className="flex items-center justify-start">
      <div className="font-bold text-lg">Balance:</div>
      <div className="font-semibold ml-4 text-lg">Rs. {balance}</div>
    </div>
  );
}

export default Balance;
