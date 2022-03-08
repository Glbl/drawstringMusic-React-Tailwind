import React, {useEffect, useState} from 'react';
import Album from "../../common/Album";
import HowItWork from "../../common/HowItWork";
import Banner from "../../common/Banner";

const Dashboard = () => {
    return (
        <div className="flex flex-col space-y-8 w-full text-white pb-20">
            <Banner />
            <div className="flex space-x-12">
                <Album/>
                <HowItWork/>
            </div>
        </div>
    );
};

export default Dashboard;
