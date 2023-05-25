import { useState, useEffect} from 'react'

const Filtros = ({ filtro, setFiltro}) => {
  return (
    <div className='filtros sombra contenedor'>
        <form action="">
            <div className='campo'>
                <label >Filtrar Gastos</label>
                <select
                    id="categoria"
                    value={filtro}
                    onChange={ e => setFiltro(e.target.value)}
                >
                    <option value="">-- Mostrar Todo --</option>
                    <option value="ahorro">-- Ahorro --</option>
                    <option value="comida">-- Comida --</option>
                    <option value="casa">-- Casa --</option>
                    <option value="gastos">-- Gastos Varios --</option>
                    <option value="ocio">-- Ocío --</option>
                    <option value="salud">-- Salud --</option>
                    <option value="suscripciones">-- Suscripciones --</option>
                </select>
            </div>
        </form>
    </div>
  )
}

export default Filtros