import React from 'react';
import DashNavbar from '../dashNavbar';

const naujasServisas = () => {
    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
            <form action="/submit_servisas" method="post">
                <div>
                  <label for="pavadinimas">Pavadinimas:</label>
                  <input type="text" id="pavadinimas" name="pavadinimas" required/>
                </div>
                <div>
                  <label for="miestas">Miestas:</label>
                  <input type="text" id="miestas" name="miestas" required/>
                </div>
                <div>
                  <input type="submit" value="Submit"/>
                </div>
              </form>
            </div>
        </div>
    );
};

export default naujasServisas;