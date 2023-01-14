import { useLoaderData } from '@remix-run/react'
import { getGuitarra } from '~/models/guitarras.server'

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
    const guitarra = useLoaderData();
    const {nombre, descripcion, precio, imagen} = guitarra.data[0].attributes
    //console.log('guitarra.data[0].attributes :>> ', guitarra.data[0].attributes);

  return (
    <div className="guitarra">
        <img className='imagen' src={imagen.data.attributes.url} alt='imagen guitarra' />

        <div className="contenido">
            <h3>{nombre}</h3>
            <p className='texto'>{descripcion}</p>
            <p className='precio'>${precio} usd</p>
        </div>
    </div>
  )
}

export default Guitarra