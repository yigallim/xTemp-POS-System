import { Routes, Route, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import SelectSeat from "./pages/SelectSeat";
import Ordering from "./pages/Ordering";
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
                <Route path="/:seat" element={<CheckSeatNumberRedirect />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </ConfigProvider>
    );
}

function CheckSeatNumberRedirect() {
    const seatNumber = window.location.pathname.substring(1);
    if (seatNumbers.includes(seatNumber)) return <Ordering />;
    else return <Navigate to="/" />;
}
