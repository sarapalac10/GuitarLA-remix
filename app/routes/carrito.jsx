import { useState, useEffect } from 'react'
import { useOutletContext } from '@remix-run/react'
import styles from '../styles/carrito.css'


export function links(){
    return[
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export function meta(){
    return{
        title:'GuitarLA - Carrito de compras',
        description: 'Venta de guitarras, blog de música, carrito de compras'
    }
}

function Carrito() {
    const [total, setTotal] = useState(0);
    const { carrito, actualizarCantidad, eliminarGuitarra } = useOutletContext()
    //console.log('carrito', carrito)

    useEffect(() => {
      const calculoTotal = carrito.reduce((total, producto) => total+(producto.cantidad * producto.precio), 0)
      setTotal(calculoTotal)
    }, [carrito])
    

  return (
    
        <main className='contenedor'>
            <h1 className='heading'>Carrito de Compras</h1>

            <div className="contenido">

                <div className="carrito">
                    <h2>Artículos</h2>

                    { carrito?.length === 0 ? 'Carrito vacío' : (
                        carrito?.map(producto => (
                            <div key={producto.id} className='producto'>
                                <div>
                                    <img src={producto.imagen} alt={`Imagen del producto ${producto.nombre} `} />

                                </div>
                                <div>
                                    <p className='nombre'>{producto.nombre}</p>
                                    <p>Cantidad:</p>
                                    
                                    <select
                                    value={producto.cantidad}
                                    className='select'
                                    onChange={ e => actualizarCantidad({
                                        cantidad: +e.target.value,
                                        id: producto.id
                                    })}
                                    >
                                        <option value='1'>1</option>
                                        <option value='2'>2</option>
                                        <option value='3'>3</option>
                                        <option value='4'>4</option>
                                        <option value='5'>5</option>
                                    </select>


                                    <p className='precio'>${producto.precio} USD</p>
                                    <p className='subtotal'>Subtotal: $ <span>{producto.cantidad * producto.precio}</span> </p>
                                </div>

                                <button
                                    onClick={()=> eliminarGuitarra(producto.id)}
                                    type='button'
                                    className='btn-eliminar'
                                >X</button>


                            </div>
                        ))
                    ) }
                </div>

                <aside className='resumen'>
                    <h3>Resumen del pedido</h3>
                    <p>Total a pagar: ${total} USD</p>
                </aside>

            </div>
            
        </main>
  )
}

export default Carrito