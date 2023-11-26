import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import localStorage from "local-storage";
import CompanyInfo from "../components/Ordering/CompanyInfo";
import NavBar from "../containers/NavBar";
import Menu from "../containers/Menu";
import BottomBar from "../components/Ordering/BottomBar";
import { bottomBarType } from "../config";
import { calculateTotalPriceForEntries } from "../utils/calculatePrice";

export default function Ordering() {
  const { seat } = useParams();
  const [totalCartAmount, setTotalCartAmount] = useState(0);

  useEffect(() => {
    const cartItems = localStorage.get("cartItems") || [];
    const calculatedAmount = calculateTotalPriceForEntries(cartItems);
    setTotalCartAmount(calculatedAmount);
  }, []);

  return (
    <div className="md:mx-28 lg:mx-60 md:border-x md:shadow-2xl h-full pb-20">
      <CompanyInfo />
      <NavBar />
      <Menu />
      <BottomBar seat={seat} type={bottomBarType.ordering} cartAmount={totalCartAmount} />
    </div>
  );
}