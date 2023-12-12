import React from 'react';
import Navbar from './navbar';

const main = () => {
    return (
        <div>
            <Navbar />
            <div className="container-xl bg-secondary">
                <div className="row spread text-white fs-2">
                    <div className="col-lg-5"><p className='text-center'>Meistrai</p></div>
                    <div className="col-lg-5 py-2">    
                        <form class="form-inline d-flex">
                            <input class="form-control mr-sm-2" type="search" placeholder="Paieška" aria-label="Search"/>
                            <button class="btn btn-outline-dark my-2 my-sm-0" type="submit">Paieška</button>
                        </form>                    

                    
                    </div>
                    
                    <div className='row fs-4 border-top border-dark'>
                <div className="row col-lg-11">
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
            </div>
        </div>
    );
};

export default main;