import React from "react";
import { ShoppingCartOutlined, SettingOutlined } from "@ant-design/icons";
import { colors, bottomBarType } from "../../config";

export default function BottomBar({ seat, type, onConfirm, price }) {
    let content;

    if (type === bottomBarType.ordering) {
        content = (
            <div
                className="z-50 fixed bottom-0 left-0 right-0 md:w-auto md:left-28 md:right-28 lg:left-60 lg:right-60 flex items-center font-medium text-sm md:text-base tracking-wide font-poppins"
                style={{ boxShadow: "0 -3px 7px 0 rgb(0 0 0 / 0.15)" }}
            >
                <div className="flex items-center space-x-2 justify-between bg-white p-3 md:pl-7 flex-1">
                    <p>Table No. {seat}</p>
                    <SettingOutlined
                        style={{ fontSize: "24px" }}
                        className="bg-slate-200 p-1.5 md:p-2 cursor-pointer rounded-full  "
                    />
                </div>
                <div className="flex items-center space-x-2 justify-between bg-primary p-3 md:pr-7 flex-1">
                    <ShoppingCartOutlined
                        style={{
                            fontSize: "24px",
                            color: colors.primary,
                            fontWeight: "900",
                        }}
                        className="bg-white p-1.5 md:p-2 cursor-pointer rounded-full"
                    />
                    <p className="text-white">RM 50.00</p>
                </div>
            </div>
        );
    } else if (type === bottomBarType.customizingFood) {
        content = (
            <div
                className="z-50 fixed bottom-0 left-0 right-0 md:w-auto md:left-28 md:right-28 lg:left-60 lg:right-60 flex items-center font-medium text-sm md:text-base tracking-wide font-poppins"
                style={{ boxShadow: "0 -3px 7px 0 rgb(0 0 0 / 0.15)" }}
            >
                <div className="flex items-center bg-white py-3.5 flex-1">
                    <p className="ml-4  my-1.5">RM {parseFloat(price).toFixed(2)}</p>
                </div>
                <div className="flex items-center bg-primary py-3.5 flex-1 cursor-pointer" onClick={onConfirm}>
                    <button className="text-white font-semibold w-full text-center my-1.5">ADD TO CART</button>
                </div>
            </div>
        );
    } else {
        content = <div>Type Doesn't Exists</div>;
    }
    return content;
}
