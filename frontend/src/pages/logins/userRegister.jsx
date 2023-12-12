import React from 'react';

const userRegister = () => {
    return (
        <div className='container-xl bg-secondary text-center pt-5'>
        <form action="/submit_servisas" method="post" className='text-center p-5'>
            <p className='fs-2'>Registruotis</p>
            <div>
              <input type="text" id="vardas" name="pavadinimas" placeholder='Vardas' className='my-2' required/>
            </div>
            <div>
              <input type="text" id="email" name="pavadinimas" placeholder='E-paštas' className='my-2' required/>
            </div>
            <div>
              <input type="password" id="pass" name="miestas" placeholder='Slaptažodis' className='my-2' required/>
            </div>
            <div>
              <input type="submit" value="Submit"/>
            </div>
          </form>
    </div>
    );
};

export default userRegister;