import React from "react";
import { ShoppingCartOutlined, SettingOutlined } from "@ant-design/icons";
import { colors } from "../../config";

export default function BotBar({ seat }) {
  return (
    <div
      className="z-50 fixed bottom-0 left-0 right-0 md:w-auto md:left-28 md:right-28 lg:left-60 lg:right-60 flex items-center font-medium text-sm md:text-base tracking-wide font-poppins"
      style={{boxShadow: "0 -3px 7px 0 rgb(0 0 0 / 0.15)"}}
    >
  
          <div className="flex items-center space-x-2 justify-between bg-white p-3 md:pl-7" style={{ flex: 1 }}>
            <p>Table No. {seat}</p>
            <SettingOutlined
              style={{ fontSize: "24px" }}
              className="bg-slate-200 p-1.5 md:p-2 cursor-pointer rounded-full  "
            />
          </div>
          <div className="flex items-center space-x-2 justify-between bg-primary p-3 md:pr-7" style={{ flex: 1 }}>
            <ShoppingCartOutlined
                style={{ fontSize: "24px", color: colors.primary, fontWeight: "900" }}
                className="bg-white p-1.5 md:p-2 cursor-pointer rounded-full"
            />
            <p className="text-white">RM 50.00</p>
     
      </div>
    </div>
  );
}
