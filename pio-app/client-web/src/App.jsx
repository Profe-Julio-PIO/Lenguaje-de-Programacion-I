import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [students,setStudents] = useState()
  const [filteredStudents,setFilteredsetStudents] = useState()
  const [isModalOpen,setIsModalOpen] = useState(false)

  const openPopup=()=>{
    setIsModalOpen(true)
  }

  const handleClose=()=>{
    setIsModalOpen(false)
  }

  const getAllStudents=()=>{
    axios.get('http://localhost:4000/estudiantes').then((res)=>{
      setStudents(res.data)
    })
  }

  const handleSearch=(e)=>{
    const searchValue = e.target.value.toLowerCase();
    const filteredData=students.filter(student=>student.nombre.toLowerCase().includes(searchValue) ||
    student.major.toLowerCase().includes(searchValue) ||
    student.email.toLowerCase().includes(searchValue))
    setFilteredsetStudents(filteredData);
  }

  useEffect(()=>{
    getAllStudents()
  },[])

  return(
    <>
    <div className='std-container'>
      <h3>Aplicación usando React, Node y PostgreSQL</h3>
      <div className='search-box'>
        <input className="search-input" onChange={handleSearch} type="search" name="searchinput" id="searchinput" placeholder='Búsqueda de estudiante'/>
        <button className='addBtn addeditcolor' onClick={openPopup}>Agregar</button>
      </div>
      <div className='table-box'>
        {isModalOpen && <div className='addeditpopup'>
            <span className='closeBtn' onClick={handleClose}>&times;</span>
            <h4>Detalles del estudiante</h4>
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="name">Nombre</label>
              <input className='popupinput' type="text" name="name" id="name"/>
            </div>
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="major">Asignatura</label>
              <input className='popupinput' type="text" name="major" id="major"/>
            </div>
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="email">Email</label>
              <input className='popupinput' type="text" name="email" id="email"/>
            </div>
            <br></br>
            <button className='addStudentBtn addeditcolor'>Adicionar</button>
          </div>}
        <table className='table'>
          <tr>
            <th>Código del estudiante</th>
            <th>Nombre</th>
            <th>Asignatura</th>
            <th>Email</th>
            <th>Editar</th>
            <th>Eliminar</th>
          </tr>
          <tbody>
            {filteredStudents && filteredStudents.map(student=>{
              return(<tr key={student.estudianteId}>
                <td>{student.estudianteId}</td>
                <td>{student.nombre}</td>
                <td>{student.major}</td>
                <td>{student.email}</td>
                <td><button className='editBtn addeditcolor'>Editar</button></td>
                <td><button className='deleteBtn deletecolor'>Eliminar</button></td>
              </tr>)
            })} 
          </tbody>
        </table>
      </div>
    </div>
    </>
  )
}

export default App
