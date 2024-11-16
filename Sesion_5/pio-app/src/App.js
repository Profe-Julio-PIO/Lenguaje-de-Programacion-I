import logo from './logo.svg';
import './App.css';
/*import MiComponente from './components/MiComponente';*/
import Modulos from './components/Modulos';

function presentacion(grupo, year){
  const presentacion = 
  <div>
    <h3>Aprendiendo React en el módulo Lenguaje de Programación I, {grupo} <br/> </h3>
    <h3>Formador: Julio César Castaño Bustos</h3>
    <h4>{year}</h4><br/>
    <Modulos/>
  </div>
  
  return presentacion;
}

function App() {
  /* Declaración de componentes */
  const grupo = 'G6';
  
  /* Manejo de los componentes */
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {presentacion(grupo, 2024)}
      </header>
    </div>
  );
}

export default App;
