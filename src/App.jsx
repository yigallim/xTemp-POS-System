import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import SelectSeat from "./pages/SelectSeat";
import Ordering from "./pages/Ordering";
import FoodCustomize from "./pages/FoodCustomize";
import { colors, seatNumbers } from "./config";

export default function App() {
    return (
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: colors.primary,
                },
            }}
        >
            <Routes>
                <Route path="/" element={<SelectSeat />} />
                <Route path={"/:seat/:foodId"} element={<FoodCustomize />} />
                <Route path="/:seat" element={<CheckSeatNumberRedirect />} />
                <Route path="*" element={<Navigate to="/" />}/>
            </Routes>
        </ConfigProvider>
    );
}

function CheckSeatNumberRedirect() {
    const parts = window.location.pathname.split('/');
    const seatNumber = parts[1];
    console.log(seatNumber);

    const isExactSeat = seatNumbers.some((number) => number === seatNumber);

    if (isExactSeat) return <Ordering />;
    else return <Navigate to="/" />;
    
}
