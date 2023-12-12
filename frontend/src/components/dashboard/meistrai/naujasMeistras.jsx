import React from 'react';
import DashNavbar from '../dashNavbar';

const naujasMeistras = () => {
    return (
        <div>
            <DashNavbar />
            <div className='container-xl bg-secondary'>
            <form action="/submit_servisas" method="post" className='text-center p-5'>
                <p className='fs-2'>Pridėti naują meistrą</p>
                <div>
                  <input type="text" id="vardas" name="pavadinimas" placeholder='Vardas' className='my-2' required/>
                </div>
                <div>
                  <input type="text" id="pavarde" name="miestas" placeholder='Pavardė' className='my-2' required/>
                </div>
                <div>
                  <input type="text" id="specializacija" name="miestas" placeholder='Specializacija' className='my-2' required/>
                </div>
                <p>Nuotrauka</p>
                <input type="file" id="image" name="image" accept="image/*" required/>
                <div>
                  <input type="text" id="servisas" name="miestas" placeholder='Servisas' className='my-2' required/>
                </div>
                <div>
                  <input type="text" id="miestas" name="miestas" placeholder='Miestas' className='my-2' required/>
                </div>
                <div>
                  <input type="submit" value="Submit"/>
                </div>
              </form>
            </div>
        </div>
    );
};

export default naujasMeistras;