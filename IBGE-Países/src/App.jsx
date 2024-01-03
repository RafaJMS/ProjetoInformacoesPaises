import {useState} from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [type, setType] = useState("");
  const [country, setCountry] = useState("");

  async function flagSearch(){  
    const flagData = await axios.get(`https://flagcdn.com/256x192/${country}.png`)
  }
  
  async function countrySearch(){
    
    const data = await axios.get(`https://servicodados.ibge.gov.br/api/v1/paises/${country}/indicadores/${type}`)
  }
  
  return (
    <>
      <div className='major-box' >
        <div className='input-box'>
          <div className='country-box'>
            <label id='label-type'>País: </label> 
          <input></input>
          </div>

          <div className='type-box'>

          <div class="input-group mb-3 w-50">

            <label className="input-group-text">Identificadores</label>
            <select className="form-select">
            <option selected>Opções...</option>
            <option >77854- Redes - Assinaturas de telefonia celular</option>
            <option >77855- Redes - Assinaturas de telefonia fixa</option>
            <option >77857- Redes - Indivíduos com acesso à internet</option>
            <option >77829- Saúde - Consumo calórico</option>
            <option >77834- Saúde - Incidência de subnutrição</option>
            <option ></option>
            <option ></option>
            <option ></option>
            <option ></option>
            <option ></option>
            <option ></option>
            <option ></option>
            </select>

            </div>

          </div>
        </div>
        <div className='output-box'>

        </div>
      </div>
      
    </>
  )
}

export default App
