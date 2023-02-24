// Función personalizada para usar localStorage con useState
function useLocalStorage(like, initialValue) {
  // Obtener el valor actual de localStorage usando la clave
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(like);
      // Devolver el valor parseado o el inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay un error, devolver el valor inicial
      console.log(error);
      return initialValue;
    }
  });

  // Función para actualizar el estado y el localStorage
  const setValue = (value) => {
    try {
      // Actualizar el estado
      setStoredValue(value);
      // Actualizar el localStorage
      window.localStorage.setItem(like, JSON.stringify(value));
    } catch (error) {
      // Si hay un error, mostrarlo en la consola
      console.log(error);
    }
  };

  // Devolver el estado y la función de actualización
  return [storedValue, setValue];
}

// Para almacenar el estado de los likes en el localStorage
const [likes, setLikes] = useLocalStorage("likes", 0);
const [liked, setLiked] = useLocalStorage("liked", false);
//para darle unlike y reducir el contador de likes
const unlike = () => {
  setLiked(false);
  setLikes(likes - 1);
};

// Componente de botón
function LikeButton({ likes, setLikes, liked, setLiked }) {
  // Función para alternar el estado de liked y actualizar los likes
  const toggle = () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };
  // Renderizar el botón con el evento onClick y el texto y color según el estado de liked
  return (
    <button
      onClick={toggle}
      style={{ backgroundColor: liked ? "red" : "gray" }}
    >
      {liked ? "Unlike" : "Like"} {likes}
    </button>
  );
}

// Componente principal
function App() {
  // Usar el useLocalStorage para almacenar los likes y el estado de liked
  const [likes, setLikes] = useLocalStorage("likes", 0);
  const [liked, setLiked] = useLocalStorage("liked", false);
  // Renderizar el componente de botón, pasándole los props necesarios
  return (
    <div className="App">
      <LikeButton
        likes={likes}
        setLikes={setLikes}
        liked={liked}
        setLiked={setLiked}
      />
    </div>
  );
}
