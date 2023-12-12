import React from 'react';
import { Link } from "react-router-dom";


const visiMeistrai = () => {
    return (
        <div className='container-xl bg-secondary'>
            <div className="row py-3">
                <div className="col-lg-10 text-center fs-4 text-light">
                    Visi meistrai
                </div>
                <div className="col-lg-2 text-center fs-4">
                    <Link to="/admin/meistrai/naujas">
                    <i class="bi bi-plus-circle dark-on-hover text-light"></i>
                    </Link>
                </div>
            </div>

            <div className='row fs-4 border-top border-dark'>
                <div className="col-lg-1 border opposite py-2">
                    <i class="bi bi-x-lg text-danger dark-on-hover"></i>
                    <i class="bi bi-pencil text-warning dark-on-hover"></i>
                </div>
                <div className="row col-lg-10">
                    <div className="col-lg-2 border py-2">
                        Vardas
                    </div>
                    <div className="col-lg-2 border py-2">
                        Pavardė
                    </div>
                    <div className="col-lg-2 border py-2">
                        Specializacija
                    </div>
                    <div className="col-lg-2 border py-2">
                        Nuotrauka
                    </div>
                    <div className="col-lg-2 border py-2">
                        Servisas
                    </div>
                    <div className="col-lg-2 border py-2">
                        Miestas
                    </div>
                </div>
                <div className="col-lg-1 py-2 border-bottom border-dark">
                    <button type="button" class="btn btn-success disabled max-80 font-medium">Išsaugoti</button>
                </div>
            </div>

        </div>
    );
};

export default visiMeistrai;