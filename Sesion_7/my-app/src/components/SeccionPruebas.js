import React,{Component} from 'react';
//

import MiComponente from './MiComponente';
import Peliculas from './Peliculas';

class SeccionPruebas extends Component{

    contador = 0;

    /*constructor(props){
        super(props);
        this.state = {
            contador: 0
        };
    }*/

    state = {
        contador: 0
    };

    HolaMundo(nombre, edad){
        var presentacion = (
          <div>
            <h2>Hola a todos, soy {nombre}</h2>
            <h3>Tengo {edad} años </h3>
          </div>
        );
        return presentacion
    }

    sumar(e){
        this.setState({
            contador : (this.state.contador + 1)
        });
        
    }

    restar = (e) =>{
        this.setState({
            contador : (this.state.contador - 1)
        });
    }

    render(){
        var nombre = "Julio César Castaño Bustos";
        var edad = 41;
        return(
            <section id="content">
                <p>
                    Hola a todos, bienvenido al curso de Lenguaje de Programación I
                </p>
                <h2 className="subheader"> Funciones y JSX basico</h2>
                {this.HolaMundo(nombre,edad)}
                <h2 className="subheader"> Componentes </h2>
                <section className="componentes">
                    <MiComponente/>
                    <Peliculas/>
                </section>
                <h2 class="subheader"> Estado</h2>
                <p>
                    Contador de visitas: {this.state.contador}
                </p>
                <p>
                    <input type="button" value="Sumar" onClick={this.sumar.bind(this)}/>
                    <input type="button" value="Restar" onClick={this.restar.bind(this)}/>
                </p> 
            </section>
        );
    }
}

export default SeccionPruebas;