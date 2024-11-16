import React, { Component } from 'react';

class MiComponente extends Component {

    render(){
        let receta = {
            nombre: 'Arroz con pollo',
            ingredientes : ['Arroz', 'pollo', 'tomate', 'cebolla', 'zanahoria'],
            calorias: 900
        };

        return(
            <React.Fragment>
                <h1>{'Receta: '+ receta.nombre}</h1>
                <h2>{'Calorías: '+ receta.calorias}</h2>
                <ol>
                    {
                        receta.ingredientes.map((ingrediente, i) => {
                            console.log(ingrediente);
                            return(
                                <li key={i}>
                                    {ingrediente}
                                </li>
                            );
                        })
                    }
                </ol>
            </React.Fragment>
        );
    }
}

export default MiComponente;