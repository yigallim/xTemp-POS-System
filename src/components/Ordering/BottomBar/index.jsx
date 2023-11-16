import React from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function BotBar({seat}) {

  return (
    <div style={{zIndex: "100"}} className="bg-primary p-5 md:p-7 text-white fixed bottom-0 w-full md:w-auto md:left-28 md:right-28 lg:left-60 lg:right-60">
        <div className="container mx-auto">
            <div className="flex justify-between items-center">
                <div className="font-semibold">
                    <p>Current Seat: {seat}</p>
                </div>
                <div className="flex items-center space-x-2">
                    <ShoppingCartOutlined style={{ fontSize: '24px' }} />
                    <p className="font-semibold">RM50.00</p>
                </div>
            </div>
        </div>
    </div>
  );
}
