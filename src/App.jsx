import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, notification } from "antd";
import SelectSeat from "./pages/SelectSeat";
import Ordering from "./pages/Ordering";
import FoodCustomize from "./pages/FoodCustomize";
import Cart from "./pages/Cart";
import { ApiProvider } from "./context/ApiProvider";
import { colors, seatNumbers, foods } from "./config";

export default function App() {
  const [api, contextHolder] = notification.useNotification({
    maxCount: 3,
    top: 12,
  });
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: colors.primary,
        },
      }}
    >
      {contextHolder}
      <ApiProvider api={api}>
        <Routes>
          <Route path="/" element={<SelectSeat />} />
          <Route path={"/:seat/cart"} element={<CheckCartNumberRedirect />} />
          <Route path={"/:seat/:foodId"} element={<CheckCustomizeNumberRedirect />} />
          <Route path="/:seat" element={<CheckSeatNumberRedirect />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </ApiProvider>
    </ConfigProvider>
  );
}

function CheckCustomizeNumberRedirect() {
  if (!isExactSeat()) return <Navigate to="/" />;

  const parts = window.location.pathname.split("/");
  const customizeNumber = parts[2];

  if(!customizeNumber.startsWith("customize-"))  return <Navigate to={`/${parts[1]}`} />;
  const foodId = customizeNumber.substring("customize-".length);

  const isFoodIdValid = foods.some((item) => item.id === foodId);
  if (!isFoodIdValid) return <Navigate to={`/${parts[1]}`} />;

  return <FoodCustomize />;
}

function CheckSeatNumberRedirect() {
  if (isExactSeat()) return <Ordering />;
  else return <Navigate to="/" />;
}

function CheckCartNumberRedirect() {
  if (isExactSeat()) return <Cart />;
  else return <Navigate to="/" />;
}

function isExactSeat() {
  const parts = window.location.pathname.split("/");
  const seatNumber = parts[1];
  return seatNumbers.some((number) => number === seatNumber);
}
