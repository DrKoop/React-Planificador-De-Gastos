import { useState, useEffect } from "react"
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from '../components/Mensaje'

const Modal = ({ 
    animarModal,
    setModal,
    setAnimarModal,
    setGastoEditar,
    guardarGasto,
    gastoEditar
}) => {

    const [mensaje, setMensaje ] = useState('')
    const [ nombre, setNombre ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ categoria, setCategoria] = useState('')
    const [ fecha, setFecha] = useState('')
    const [ id, setId] = useState('')



    useEffect(() => {
        if( Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId( gastoEditar.id )
            setFecha( gastoEditar.fecha)
        }
    }, [])


    const ocultarModal = () => {
        
        setAnimarModal(false)
        setGastoEditar({})

        setTimeout(() => {
            setModal(false)
        }, 500);

    }

    const handleFormularioSubmit = e => {
        e.preventDefault();
        //Validacion
        if([nombre, cantidad, categoria].includes('')){
            setMensaje('Todos los campos son Obligatorios.')
            setTimeout(() => {
                setMensaje('')
            }, 1000);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }


  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal}
            />
        </div>

        <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`}
            onSubmit={ handleFormularioSubmit }
        >
            <legend>{ gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto' }</legend>
            { mensaje && 
                <Mensaje tipo="error">
                    {mensaje}
                </Mensaje>
            }
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>
                <input
                    type="text"
                    id='nombre'
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) }
                    placeholder='  Añade el Nombre del Gasto'    
                />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>
                <input
                    type="number"
                    value={cantidad}
                    onChange={ e => setCantidad(Number( e.target.value ))}
                    id='cantidad'
                    placeholder='  Añade la Cantidad del Gasto'    
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoría</label>
                <select
                    id="categoria"
                    value={categoria}
                    onChange={ e => setCategoria(e.target.value) }
                >
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">-- Ahorro --</option>
                    <option value="comida">-- Comida --</option>
                    <option value="casa">-- Casa --</option>
                    <option value="gastos">-- Gastos Varios --</option>
                    <option value="ocio">-- Ocío --</option>
                    <option value="salud">-- Salud --</option>
                    <option value="suscripciones">-- Suscripciones --</option>
                </select>
            </div>
            <input
                type="submit"
                value={ gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto' }
            />
        </form>
    </div>
  )
}

export default Modal