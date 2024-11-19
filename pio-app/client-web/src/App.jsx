import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {

  const [students,setStudents] = useState([])
  const [filteredStudents,setFilteredsetStudents] = useState([])
  const [isModalOpen,setIsModalOpen] = useState(false)
  const [studentData,setStudentData] = useState({nombre:"",asignatura:"",email:""})

  /* Manejo de errores */
  const [errorMessage, setErrorMessage] = useState("")

  const openPopup=()=>{
    setIsModalOpen(true)
  }

  const handleClose=()=>{
    setIsModalOpen(false)
    getAllStudents();
    setStudentData({nombre:"",asignatura:"",email:""})
    setErrorMessage(""); //=> ubicamos en la ventana modal el error
  }

  const getAllStudents=()=>{
    axios.get('http://localhost:4000/estudiantes').then((res)=>{
      setStudents(res.data)
      setFilteredsetStudents(res.data)
    })
  }

  const handleSearch=(e)=>{
    const searchValue = e.target.value.toLowerCase();
    const filteredData=students.filter(student=>student.nombre.toLowerCase().includes(searchValue) ||
    student.asignatura.toLowerCase().includes(searchValue) ||
    student.email.toLowerCase().includes(searchValue))
    setFilteredsetStudents(filteredData);
  }

  const handleChange=(e)=>{
    setStudentData({...studentData,[e.target.name]:e.target.value});
  }

  /* Se crea el método para eliminar los registros por el estudiantesId*/
  const handleDelete=async(estudiantesId)=>{
    const confirmar = window.confirm('¿Desea eliminar el registro?');
    if(confirmar){
      await axios.delete(`http://localhost:4000/estudiantes/${estudiantesId}`).then((res)=>{
        setStudentData(res.data);
        setFilteredsetStudents(res.data);
      })
    }
    window.location.reload();
    getAllStudents();
  }

  const handleUpdate=(student)=>{
    setStudentData(student);
    openPopup();
  }
  
  const handleSubmit= async (e)=>{
    e.preventDefault();
    let ErrorMessage=''; /* Se crea una variable para generar el error */
    /* Se crea una restricción si el usuario deja un campo vacío, se muestra el error */
    if(!studentData.nombre || !studentData.asignatura || !studentData.email){
      ErrorMessage='Los campos son obligatorios';
      setErrorMessage(ErrorMessage);
    }
    if((ErrorMessage.length == 0) && studentData.estudiantesId){
      await axios.patch(`http://localhost:4000/estudiantes/${studentData.estudiantesId}`,studentData).then((res)=>{
        console.log(res.data);
      })
    }
    else if(ErrorMessage.length == 0){
      await axios.post('http://localhost:4000/estudiantes',studentData).then((res)=>{
        console.log(res.data);
      })
    }
    if((ErrorMessage.length == 0)){
      handleClose();
    }

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
            {errorMessage && <p className='error'>{errorMessage}</p>}
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="name">Nombre</label>
              <input className='popupinput' value={studentData.nombre} onChange={handleChange} type="text" name="nombre" id="nombre"/>
            </div>
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="major">Asignatura</label>
              <input className='popupinput' value={studentData.asignatura} onChange={handleChange} type="text" name="asignatura" id="asignatura"/>
            </div>
            <div className='popupDiv'>
              <label className='popuplabel' htmlFor="email">Email</label>
              <input className='popupinput' value={studentData.email} onChange={handleChange} type="text" name="email" id="email"/>
            </div>
            <br></br>
            <button className='addStudentBtn addeditcolor' onClick={handleSubmit}>{studentData.estudiantesId?"Actualizar":"Adicionar"}</button>
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
              return(<tr key={student.estudiantesId}>
                <td>{student.estudiantesId}</td>
                <td>{student.nombre}</td>
                <td>{student.asignatura}</td>
                <td>{student.email}</td>
                <td><button className='editBtn addeditcolor'onClick={()=>handleUpdate(student)}>Editar</button></td>
                <td><button className='deleteBtn deletecolor'onClick={()=>handleDelete(student.estudiantesId)}>Eliminar</button></td>
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
