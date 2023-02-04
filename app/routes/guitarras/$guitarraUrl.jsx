import { useLoaderData, useOutletContext } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'
import { useState } from 'react';

export async function loader({params}) {
    const { guitarraUrl } = params;
    const guitarra = await getGuitarra(guitarraUrl);

    if(guitarra.data.length === 0){
        throw new Response('', {
            status: 404,
            statusText: ' Guitarra No encontrada'
        })
    }
    //console.log('guitarra :>> ', guitarra.data[0].attributes.nombre);
    return guitarra
}

export function meta({data}) {

    if(!data){
        return{
            title: 'GuitarLA - Guitarra no encontrada',
            description: `Guitarra, venta de guitarras, guitarra no encontrada`
        }
    }

    return{
        title: `GuitarLA- ${data.data[0].attributes.nombre}`,
        description: `Guitarra, venta de guitarras, guitarra ${data.data[0].attributes.nombre}`
    }
}

function Guitarra() {
    const { agregarCarrito } = useOutletContext();
    const [cantidad, setCantidad] = useState(0);

    const guitarra = useLoaderData();
    const {nombre, descripcion, precio, imagen} = guitarra.data[0].attributes
    //console.log('guitarra.data[0].attributes :>> ', guitarra.data[0].attributes);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(cantidad<1){
            alert('Debes seleccionar una cantidad mayor o igual a 1');
            return
        }

        const guitarraSeleccionada = {
            id: guitarra.data[0].id,
            imagen: imagen.data.attributes.url,
            nombre,
            precio,
            cantidad
        }
        //console.log('guitarraSeleccionada :>> ', guitarraSeleccionada);
        agregarCarrito(guitarraSeleccionada)
    }

  return (
    <div className="guitarra">
        <img className='imagen' src={imagen.data.attributes.url} alt='imagen guitarra' />

        <div className="contenido">
            <h3>{nombre}</h3>
            <p className='texto'>{descripcion}</p>
            <p className='precio'>${precio} usd</p>

            <form onSubmit={handleSubmit} className='formulario'>
                <label htmlFor='cantidad '>Cantidad: </label>

                <select 
                    id='cantidad'
                    onChange={ e=> setCantidad(+e.target.value) }
                >
                    <option value="0">--- Selecciona ---</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>

                <input 
                    type='submit'
                    value='Agregar al carrito'
                />
            </form>

        </div>
    </div>
  )
}

export default Guitarra