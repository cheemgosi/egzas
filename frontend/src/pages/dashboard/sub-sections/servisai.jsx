import React from 'react';
import DashNavbar from '../../../components/dashboard/dashNavbar';
import Lentele from '../../../components/dashboard/servisai/lentele'


const servisai = () => {
    return (
        <div>
            <DashNavbar />
            <Lentele title = "Servisai" />
        </div>
    );
};

export default servisai;