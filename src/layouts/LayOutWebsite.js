import React from 'react';
import Footer from '../conponents/Footer';
import Header from '../conponents/Header';
// import {
//     BrowserRouter as Router,
//     Switch,
//     Route,
//     Link
//   } from "react-router-dom";

const LayOutWebsite = (props) => {
    return (
        <>
            <Header {...props}/>

            {props.children}


            <Footer/>
        </>
    )
}

export default LayOutWebsite
