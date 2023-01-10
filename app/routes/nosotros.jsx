import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta() {
    return(
        {
          title: 'GuitarLA - Nosotros',
          description: 'Venta de guitarras, blog de música'
        }
    )
}

export function links() {
  return(
    {
      rel: 'stylesheet',
      href: styles
    }
/*     {
      rel:'preloaded',
      href: imagen,
      as: 'imagen'
    } */
  )
}

function Nosotros() {
  return (
    <main className="contenedor nosotros">
      <h2 className="heading">Nosotros</h2>

      <div className="contenido">
        <img src={imagen} alt='imagen sobre nosotros'/>
        <div>
          <p> Pretend not to be evil run up and down stairs and i like fish sit and stare hide at bottom of staircase to trip human or making bread on the bathrobe. Intrigued by the shower cats are fats i like to pets them they like to meow back, for suddenly go on wild-eyed crazy rampage, and eat all the power cords milk the cow so milk the cow. </p>
          <p>Eats owners hair then claws head kitten is playing with dead mouse and meow all night weigh eight pounds but take up a full-size bed yet meow for food, then when human fills food dish, take a few bites of food and continue meowing rub butt on table. Blow up sofa in 3 seconds cat dog hate mouse eat string barf pillow no baths hate everything. </p>
        </div>
      </div>

    </main>
  )
}

export default Nosotros