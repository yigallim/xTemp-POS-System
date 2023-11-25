import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider, notification } from "antd";
import SelectSeat from "./pages/SelectSeat";
import Ordering from "./pages/Ordering";
import FoodCustomize from "./pages/FoodCustomize";
import { colors, seatNumbers } from "./config";

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
      <Routes>
        <Route path="/" element={<SelectSeat />} />
        <Route path={"/:seat/:foodId"} element={<FoodCustomize api={api} />} />
        <Route path="/:seat" element={<CheckSeatNumberRedirect />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </ConfigProvider>
  );
}

function CheckSeatNumberRedirect() {
  const parts = window.location.pathname.split("/");
  const seatNumber = parts[1];

  const isExactSeat = seatNumbers.some((number) => number === seatNumber);

  if (isExactSeat) return <Ordering />;
  else return <Navigate to="/" />;
}
