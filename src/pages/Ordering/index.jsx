import React from "react";
import { useParams, Navigate } from 'react-router-dom';
import CompanyInfo from "../../components/Ordering/CompanyInfo";
import NavBar from "../../components/Ordering/NavBar";
import Menu from "../../components/Ordering/Menu";
import BottomBar from "../../components/Ordering/BottomBar";

export default function Ordering() {
    const { seat } = useParams();

    return (
        <div className="md:mx-28 lg:mx-60 md:border-x md:shadow-2xl h-full pb-20">
            <CompanyInfo />
            <NavBar />
            <Menu />
            <BottomBar seat={seat} />
        </div>
    );
}
