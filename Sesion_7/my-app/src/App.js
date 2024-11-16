import logo from './logo.svg';
import './assets/css/App.css';

//Importar componentes

import Header from './components/Header';
import Slider from './components/Slider';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import SeccionPruebas from './components/SeccionPruebas';

function App() {
  var buttonString = "Ver Más";
  return (
    <div className="App">
      <Header/>
      <Slider
        title="Bienvenido al módulo de Lenguaje de Programación I con el profe Julio."
        btn = {buttonString}
      />
      
      <div className="center">
        <SeccionPruebas/>
        <Sidebar/>
        <div className="clearfix"></div>
      </div>{/* END DIV CENTER */}
      <Footer />
    </div>
  );
}

export default App;
