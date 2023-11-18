import React from "react";
import { retail } from "../../config";

export default function CompanyInfo() {
    return (
        <div className="md:flex border-b border-gray-500">
            <div className="md:w-1/2">
                <img
                    src="/img/banner.png"
                    alt="Restaurant"
                    className="h-full w-full retail-banner"
                />
            </div>
            <div className={"p-4 md:p-7 text-gray-900 md:w-1/2 "}>
                <h2 className="text-xl md:text-3xl font-bold mb-1 md:mb-4 ">
                    {retail.name}
                </h2>
                <div className="bg-primary h-1 w-20 md:w-32 mb-3 md:mb-5"></div>
                <p className="mb-3 text-gray-600 text-sm md:text-base">
                    {retail.address}
                </p>
                <p className="text-gray-600 text-sm md:text-base">
                    Tel : {retail.tel}
                </p>
            </div>
        </div>
    );
}
