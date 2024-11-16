import React, {Component} from 'react';

class Modulos extends Component {
    render(){
        const modulos = {
            nombre: 'Metodologías Ágiles',
            duracion: 48
        };
        return(
            <div>
                <h4>{`Módulo de formación: ${modulos.nombre}`}</h4>
                <h4>{`Intensidad(horas): ${modulos.duracion}`}</h4>
            </div>
        )
    }
}

export default Modulos;