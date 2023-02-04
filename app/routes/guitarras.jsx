import { Outlet, useOutletContext } from '@remix-run/react'
import styles from '~/styles/guitarras.css'

export function meta() {
  return{
        title: 'GuitarLA - Tienda de guitarras',
        description: 'GuitarLA- Nueva colección de guitarras '
      }
}

export function links(){
  return[
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

function Tienda() {
  return (
    <main className='contenedor'>
      <Outlet
        context={ useOutletContext() }
      />
    </main>
  )
}

export default Tienda