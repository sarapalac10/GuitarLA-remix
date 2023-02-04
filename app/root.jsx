import { useEffect, useState } from 'react'

import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload,
    useCatch, 
    Link
} from '@remix-run/react';

import styles from './styles/index.css';
import Header from '~/components/header';
import Footer from './components/footer';

export function meta() {
    return(
        {
            charset: 'utf-8',
            title: 'GuitarLA -Remix',
            viewport: 'width=device-width,initial-scale=1'
        }
    )
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin : 'true'
        },
        {
            rel: 'stylesheet',
            href:'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'

        },
        {
            rel: 'stylesheet',
            href: styles
        }
    ]
}

export default function App() {

    const carritoLocalStorage = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null

    const [carrito, setCarrito] = useState(carritoLocalStorage)

    useEffect(() => {
      console.log('Enviado desde use Efect :>> ');
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])
    

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
            //El elemento ya existe
            console.log('El elemento ya está en el carrito..');
            //Iterar sobre el arreglo, identificar el duplicado
            const carritoActualizado = carrito.map( guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //Reescribiendo la cantidad QUEDA EL NUEVO VALOR QUE SE LE PONGA EN LA CANTIDAD
                    guitarraState.cantidad = guitarra.cantidad
                    //Si deseo que SUME la cantidad anterior a la nueva seleccionada sería :
                    //guitarraState.cantidad += guitarra.cantidad
                }
                return guitarraState
            })
            //Agregar al carrito
            setCarrito(carritoActualizado)

        } else {
            //Registro nuevo, agregarlo al carrito
            setCarrito([...carrito, guitarra])
        }
    }

    //Cuando la cantidad se cambia en la página del carrito de compras

    const actualizarCantidad = guitarra => {
        console.log('guitarra :>> ', guitarra);
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState
        })
        setCarrito(carritoActualizado)
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado)
    }

    return(
        <Document>
            <Outlet 
                context={{
                    agregarCarrito,
                    carrito,
                    actualizarCantidad,
                    eliminarGuitarra
                }}
            />
        </Document>
    )
}

function Document({children}) {
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header />
                {children}
                <Footer />
                <Scripts />
                <LiveReload />
            </body>
        </html>
    )
}

/** Manejo de errores **/
//El error se pasa a través del useCatch
export function CatchBoundary() {
    const error = useCatch()
    return (
        <Document>
            <p className='error'>{error.status}{error.statusText}</p>
            <Link to='/' className='error-enlace'>Regresar a la página principal</Link>
        </Document>
    )
}

//El error se pasa en el componente 
export function ErrorBoundary({error}) {
    return (
        <Document>
            <p className='error'>{error.status}{error.statusText}</p>
            <Link to='/' className='error-enlace'>Regresar a la página principal</Link>
        </Document>
    )
}