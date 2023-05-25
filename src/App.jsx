import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import Filtros from './components/Filtros'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    //DE String a ARREGLO !
    localStorage.getItem('gastos') ? JSON.parse( localStorage.getItem('gastos')) : []
  )

  const [ presupuesto, setPresupuesto ] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0 
  )
  
  const [isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ modal, setModal] = useState(false)
  const [ animarModal, setAnimarModal ] = useState(false)
  const [ gastoEditar, setGastoEditar ] = useState({})
  const [ filtro, setFiltro] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState([])

  useEffect(() => {
    if( Object.keys(gastoEditar).length > 0 ){
      setModal(true)
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    }
  }, [gastoEditar])

  /* -------------------------------------------------------------------------- */
  /*                   Persitencias de Datos con LocalStorage                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect(() => {
    //De Array a String para almacenarlo en localStorage
    localStorage.setItem('gastos', JSON.stringify( gastos ) ?? []);
  }, [gastos])

  useEffect(() => {
    const presupuestoLocalStorage = Number(localStorage.getItem('presupuesto')) ?? 0;
    if( presupuestoLocalStorage > 0){
      setIsValidPresupuesto(true)
    }
  }, [])
  
  /* -------------------------------------------------------------------------- */
  /*                              Fin Persistencia                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if(filtro){
      const gastosFiltrados = gastos.filter( gastoFiltrado => gastoFiltrado.categoria === filtro)
      setGastosFiltrados(gastosFiltrados)
    }
  }, [filtro])

  const handlenuevoGasto = () => {
    setModal(true)
    setGastoEditar({})
    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }


  const guardarGasto = gasto => {
    if( gasto.id ){
      //Editar un gasto
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos( gastosActualizados )
      setGastoEditar({})
    }else{
      //Un nuevo gasto
      gasto.id = generarId();
      gasto.fecha = Date.now();
      //Convirtiendo el Objeto que viene desde el Modal (con las varibles) a un array
      setGastos([...gastos, gasto])
    }
    setAnimarModal(false)
    setTimeout(() => {
      setModal(false)
    }, 500);
  }


  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id)
    setGastos(gastosActualizados)
  }

  return(
    <div className={ modal ? 'fijar' : ''}>
      <Header
        gastos = { gastos }
        setGastos = {setGastos}
        presupuesto = {presupuesto}
        setPresupuesto = {setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <Filtros
              filtro={filtro}
              setFiltro={setFiltro}
            />
            <ListadoGastos
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={ eliminarGasto}
              filtro={filtro}
              gastosFiltrados = { gastosFiltrados }
            />
          </main>
          <div className='nuevo-gasto'>
            <img 
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handlenuevoGasto}
              />
          </div>
        </>
      )}

      {modal &&
      <Modal
        animarModal = {animarModal}
        setAnimarModal= { setAnimarModal }
        setModal = {setModal}
        guardarGasto={ guardarGasto }
        gastoEditar = { gastoEditar }
        setGastoEditar={setGastoEditar}
      />
      }
      
    </div>
  )
}

export default App
