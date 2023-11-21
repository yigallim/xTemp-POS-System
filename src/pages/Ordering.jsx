import React from "react";
import { useParams } from 'react-router-dom';
import CompanyInfo from "../components/Ordering/CompanyInfo";
import NavBar from "../containers/NavBar";
import Menu from "../containers/Menu";
import BottomBar from "../components/Ordering/BottomBar";

export default function Ordering() {
    const { seat } = useParams();
    return (
        <div className="md:mx-28 lg:mx-60 md:border-x md:shadow-2xl h-full pb-20">
            <CompanyInfo />
            <NavBar />
            <Menu seat={seat} />
            <BottomBar seat={seat} />
        </div>
    );
}
