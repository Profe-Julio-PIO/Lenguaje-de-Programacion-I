import React, {Component} from 'react';
import MensajeEstatico from './MensajeEstatico';

class Peliculas extends Component{
    render(){
        return(
            <div id="peliculas">
                <h4>Soy el componente de películas del Teatro Apolo S.A.</h4>
                <MensajeEstatico/>
            </div>
        );
    }
}

export default Peliculas;