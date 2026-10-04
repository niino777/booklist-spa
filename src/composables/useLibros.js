import { ref, watch } from 'vue'

// Estado compartido: se declara fuera de la función para que
// todas las vistas lean y modifiquen la misma lista.
const libros = ref(JSON.parse(localStorage.getItem('libros') ?? '[]'))

watch(libros, (valor) => localStorage.setItem('libros', JSON.stringify(valor)), { deep: true })

const ejemplos = [
  {
    titulo: 'Cien años de soledad',
    autor: 'Gabriel García Márquez',
    categoria: 'Novela',
    descripcion: 'Saga de la familia Buendía a lo largo de siete generaciones en Macondo, un pueblo imaginario que nace, prospera y se desvanece. Mezcla lo cotidiano con lo extraordinario y recorre amores, guerras civiles y soledades heredadas. Es una de las obras centrales del realismo mágico latinoamericano.',
  },
  {
    titulo: 'La casa de los espíritus',
    autor: 'Isabel Allende',
    categoria: 'Novela',
    descripcion: 'Narra la historia de la familia Trueba a través de tres generaciones de mujeres, desde Clara, con sus dones premonitorios, hasta su nieta Alba. Combina la vida íntima de la familia con la convulsión política de un país latinoamericano que culmina en un golpe de Estado.',
  },
  {
    titulo: 'Veinte poemas de amor y una canción desesperada',
    autor: 'Pablo Neruda',
    categoria: 'Poesía',
    descripcion: 'Poemario de juventud publicado en 1924, de tono íntimo y sensual. Sus versos exploran el deseo, la ausencia y el desamor, usando los paisajes del sur de Chile como espejo de las emociones. Fue el libro que dio fama temprana al poeta.',
  },
  {
    titulo: 'El laberinto de la soledad',
    autor: 'Octavio Paz',
    categoria: 'Ensayo',
    descripcion: 'Ensayo que reflexiona sobre la identidad del mexicano y su relación con la historia, las fiestas, la muerte y el mito. Paz plantea que la soledad es una experiencia central de la condición mexicana y, al mismo tiempo, de la condición humana. Es un clásico del pensamiento latinoamericano.',
  },
  {
    titulo: 'Cosmos',
    autor: 'Carl Sagan',
    categoria: 'Ciencia',
    descripcion: 'Recorrido divulgativo por el universo, desde el origen de la vida en la Tierra hasta las estrellas y las galaxias. Sagan explica con claridad la historia de la ciencia y la curiosidad humana por comprender el cosmos. El libro nació junto a una serie de televisión del mismo nombre.',
  },
  {
    titulo: 'El principito',
    autor: 'Antoine de Saint-Exupéry',
    categoria: 'Infantil',
    descripcion: 'Un piloto varado en el desierto conoce a un pequeño príncipe que viaja de planeta en planeta. A través de sus encuentros, el relato habla de la amistad, el amor y la mirada de los adultos. Es un cuento para niños que también invita a lectores de todas las edades a reflexionar.',
  },
]

export function useLibros() {
  function agregarLibro(libro) {
    // id incremental: da rutas limpias como /libros/3
    const id = Math.max(0, ...libros.value.map((l) => l.id)) + 1
    libros.value.push({ id, leido: false, ...libro })
  }

  function eliminarLibro(id) {
    libros.value = libros.value.filter((libro) => libro.id !== id)
  }

  function alternarLeido(id) {
    const libro = libros.value.find((l) => l.id === id)
    if (libro) libro.leido = !libro.leido
  }

  function cargarEjemplos() {
    ejemplos.forEach(agregarLibro)
  }

  function buscarLibro(id) {
    return libros.value.find((libro) => String(libro.id) === id)
  }

  return { libros, agregarLibro, eliminarLibro, alternarLeido, cargarEjemplos, buscarLibro }
}
