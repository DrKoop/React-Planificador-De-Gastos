import React from 'react'
import { useState } from 'react';
import Mensaje from './Mensaje';

const NuevoPresupuesto = ({ 
    presupuesto,
    setPresupuesto,
    setIsValidPresupuesto

    }) => {


    const [ mensaje, setMensaje] = useState('')

    const handlePresupuesto = (e) => {
        e.preventDefault();
        //validacion
        if( !presupuesto || presupuesto <0 ){
            setMensaje('No es un Presupuesto Valido')
            return
        }

        setMensaje('')
        setIsValidPresupuesto(true)
    }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
       <form onSubmit={ handlePresupuesto } className='formulario'>
            <div className='campo'>
                <label htmlFor="">Definir Presupuesto</label>
                <input 
                    type="number"
                    className='nuevo-presupuesto'
                    placeholder='Añade Tu Presupuesto'
                    value={presupuesto}
                    onChange={ element => setPresupuesto(Number(element.target.value)) }
                    />
            </div>
            <input type="submit" value="Añadir" />
            { mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
       </form>
    </div>
  )
}

export default NuevoPresupuesto