import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css'


function App() {
  const [type, setType] = useState();
  const [typeName, setTypeName] = useState()
  const [country, setCountry] = useState();
  const [countryDesc,setCountryDesc] = useState()
  const [countryData,setCountryData] = useState()
  const [countryName, setCountryName] = useState()
  const [countryValue0,setCountryValue0] = useState()
  const [countryValue1,setCountryValue1] = useState()
  const [countryValue2,setCountryValue2] = useState()
  const [countryUnity,setcountryUnity] = useState()
  const [countryCapital,setCountryCapital] = useState()
  const [countryContinent,setCountryContinent] = useState()
  const [countryLanguage,setCountryLanguage] = useState()
  const [countryInterRegion,setCountryInterRegion] = useState()
  const [countrySubregion,setCountrySubregion] = useState()
  const [moneySymbol, setMoneySymbol] = useState()
  const [flagData,setflagData] = useState()
  const [error,setError] = useState()

  function keyPress(event) {
    if (event.key === 'Enter') {
      clickButton()
    }
  }

  async function declareName(){
    let response = await axios.get(`https://restcountries.com/v3.1/alpha/${country}?lang=pt`)
    setCountryName(response.data[0].translations['por']['common'])
  }

  async function flagSearch(){  
    let lowercasecountry = country.toLowerCase();
    let response = await axios.get(`https://flagcdn.com/256x192/${lowercasecountry}.png`)
    setflagData(response.config.url)
  }
  
  async function countrySearch(){  

      let responseData = await axios.get(`https://servicodados.ibge.gov.br/api/v1/paises/${country}/indicadores/${type}?periodo=2018,2019,2020`)
      let responseDesc = await axios.get(`https://servicodados.ibge.gov.br/api/v1/paises/${country}`)
      let response = responseDesc.data[0].linguas[0].nome
      let subregiao = responseDesc.data[0].localizacao['sub-regiao'].nome
      let unidmonet = responseDesc.data[0]["unidades-monetarias"][0].nome

      setCountryLanguage(response[0].toUpperCase() + response.substring(1))
      setCountryData(responseData)
      setCountryDesc(responseDesc.data[0].historico)
      setCountryCapital(responseDesc.data[0].governo.capital.nome)
      setCountryContinent(responseDesc.data[0].localizacao.regiao.nome)
      setTypeName(responseData.data[0].indicador)
      setCountrySubregion(subregiao)
      setMoneySymbol(unidmonet)

      if(responseDesc.data[0].localizacao['regiao-intermediaria'] != undefined){
        let regiaointer = responseDesc.data[0].localizacao['regiao-intermediaria'].nome
          setCountryInterRegion(regiaointer)
      }else{
        setCountryInterRegion('--')
      }

      
  }

  useEffect(() => {
    if(countryData) {
      if (countryData.data[0] != undefined){
 
        if(countryData.data[0].series[0] != undefined)
        {
          window.scrollTo({
            top:2000,
            left:0,
            behavior:'smooth'
          });
      
          
          if(countryData.data[0].series[0].serie[0]["2018"] !=undefined){
            setCountryValue0(countryData.data[0].series[0].serie[0]["2018"])
          }else{
            setCountryValue0('-')
            setcountryUnity('')
          }

          if(countryData.data[0].series[0].serie[1]["2019"] !=undefined){
            setCountryValue1(countryData.data[0].series[0].serie[1]["2019"])
          }else{
            setCountryValue1('-')
            setcountryUnity('')
          }
          
          if(countryData.data[0].series[0].serie[2]["2020"] !=undefined){
            setCountryValue2(countryData.data[0].series[0].serie[2]["2020"])
          }else{
            setCountryValue2('-')
            setcountryUnity('')
          }

          setError(undefined)
  
          if(countryData.data[0].unidade != undefined){ 
            setcountryUnity(countryData.data[0].unidade.id)
          
          }else{
            setcountryUnity('%')
          }
  
        }else{
          setError('Aparentemente esse país não apresenta esses dados. Tente dados diferentes!')
          setCountryValue0('-')
          setCountryValue1('-')
          setCountryValue2('-')
          setcountryUnity('%')
  
        }
      }else{
        setError('Aparentemente esse país não apresenta esses dados. Tente dados diferentes!')
        setCountryValue0('-')
        setCountryValue1('-')
        setCountryValue2('-')
        setcountryUnity('%')
  
      }
    }
  }, [countryData])

  
  function clickButton(){
    declareName();
    flagSearch();
    countrySearch();
  }

  return (
    <>
      <div className='major-box' >
        <div className='container'>
          <h2 className='title'> PESQUISA IBGE - Países da ONU</h2>
    
      <div className='input-box input-group gap-3' > 
      <div className='header-box'>
        <div className='input-group grid gap-0 row-gap-3 country-type-box' >  
          <div className="input-group  w-100">

            <label label className="input-group-text">Países</label>
            <select onKeyDown={keyPress} onChange={(c => setCountry(c.target.value)) } defaultValue="" className="form-select">
              <option value="" disabled hidden id='select-placeholder'>Selecione um País</option>
              <option value="AF">Afeganistão</option>
              <option value="ZA">África do Sul</option>
              <option value="AL">Albânia</option>
              <option value="DE">Alemanha</option>
              <option value="AD">Andorra</option>
              <option value="AO">Angola</option>
              <option value="AG">Antígua e Barbuda</option>
              <option value="SA">Arábia Saudita</option>
              <option value="DZ">Argélia</option>
              <option value="AR">Argentina</option>
              <option value="AM">Armênia</option>
              <option value="AU">Austrália</option>
              <option value="AT">Áustria</option>
              <option value="AZ">Azerbaijão</option>
              <option value="BS">Bahamas</option>
              <option value="BD">Bangladesh</option>
              <option value="BB">Barbados</option>
              <option value="BH">Barein</option>
              <option value="BY">Belarus</option>
              <option value="BE">Bélgica</option>
              <option value="BZ">Belize</option>
              <option value="BJ">Benin</option>
              <option value="BO">Bolívia</option>
              <option value="BA">Bósnia e Herzegovina</option>
              <option value="BW">Botsuana</option>
              <option value="BR">Brasil</option>
              <option value="BN">Brunei</option>
              <option value="BG">Bulgária</option>
              <option value="BF">Burkina Faso</option>
              <option value="BI">Burundi</option>
              <option value="BT">Butão</option>
              <option value="CV">Cabo Verde</option>
              <option value="CM">Camarões</option>
              <option value="KH">Camboja</option>
              <option value="CA">Canadá</option>
              <option value="QA">Catar</option>
              <option value="KZ">Cazaquistão</option>
              <option value="TD">Chade</option>
              <option value="CL">Chile</option>
              <option value="CN">China</option>
              <option value="CY">Chipre</option>
              <option value="CO">Colômbia</option>
              <option value="KM">Comores</option>
              <option value="CG">Congo</option>
              <option value="CI">Costa do Marfim</option>
              <option value="CR">Costa Rica</option>
              <option value="HR">Croácia</option>
              <option value="CU">Cuba</option>
              <option value="DK">Dinamarca</option>
              <option value="DJ">Djibouti</option>
              <option value="DM">Dominica</option>
              <option value="EG">Egito</option>
              <option value="SV">El Salvador</option>
              <option value="AE">Emirados Árabes Unidos</option>
              <option value="EC">Equador</option>
              <option value="ER">Eritréia</option>
              <option value="SK">Eslováquia</option>
              <option value="SI">Eslovênia</option>
              <option value="ES">Espanha</option>
              <option value="US">Estados Unidos da América</option>
              <option value="EE">Estônia</option>
              <option value="SZ">Eswatini</option>
              <option value="ET">Etiópia</option>
              <option value="FJ">Fiji</option>
              <option value="PH">Filipinas</option>
              <option value="FI">Finlândia</option>
              <option value="FR">França</option>
              <option value="GA">Gabão</option>
              <option value="GM">Gâmbia</option>
              <option value="GH">Gana</option>
              <option value="GE">Geórgia</option>
              <option value="GD">Granada</option>
              <option value="GR">Grécia</option>
              <option value="GT">Guatemala</option>
              <option value="GY">Guiana</option>
              <option value="GN">Guiné</option>
              <option value="GQ">Guiné Equatorial</option>
              <option value="GW">Guiné-Bissau</option>
              <option value="HT">Haiti</option>
              <option value="NL">Holanda</option>
              <option value="HN">Honduras</option>
              <option value="HU">Hungria</option>
              <option value="YE">Iêmen</option>
              <option value="MH">Ilhas Marshall</option>
              <option value="SB">Ilhas Salomão</option>
              <option value="IN">Índia</option>
              <option value="ID">Indonésia</option>
              <option value="IR">Irã</option>
              <option value="IQ">Iraque</option>
              <option value="IE">Irlanda</option>
              <option value="IS">Islândia</option>
              <option value="IL">Israel</option>
              <option value="IT">Itália</option>
              <option value="JM">Jamaica</option>
              <option value="JP">Japão</option>
              <option value="JO">Jordânia</option>
              <option value="KI">Kiribati</option>
              <option value="KW">Kuwait</option>
              <option value="LA">Laos</option>
              <option value="LS">Lesoto</option>
              <option value="LV">Letônia</option>
              <option value="LB">Líbano</option>
              <option value="LR">Libéria</option>
              <option value="LY">Líbia</option>
              <option value="LI">Liechtenstein</option>
              <option value="LT">Lituânia</option>
              <option value="LU">Luxemburgo</option>
              <option value="MK">Macedônia do Norte</option>
              <option value="MG">Madagáscar</option>
              <option value="MY">Malásia</option>
              <option value="MW">Malauí</option>
              <option value="MV">Maldivas</option>
              <option value="ML">Mali</option>
              <option value="MT">Malta</option>
              <option value="MA">Marrocos</option>
              <option value="MU">Maurício</option>
              <option value="MR">Mauritânia</option>
              <option value="MX">México</option>
              <option value="MM">Mianmar</option>
              <option value="FM">Micronésia</option>
              <option value="MZ">Moçambique</option>
              <option value="MD">Moldávia</option>
              <option value="MC">Mônaco</option>
              <option value="MN">Mongólia</option>
              <option value="ME">Montenegro</option>
              <option value="NA">Namíbia</option>
              <option value="NR">Nauru</option>
              <option value="NP">Nepal</option>
              <option value="NI">Nicarágua</option>
              <option value="NE">Níger</option>
              <option value="NG">Nigéria</option>
              <option value="NO">Noruega</option>
              <option value="NZ">Nova Zelândia</option>
              <option value="OM">Omã</option>
              <option value="PW">Palau</option>
              <option value="PA">Panamá</option>
              <option value="PG">Papua Nova Guiné</option>
              <option value="PK">Paquistão</option>
              <option value="PY">Paraguai</option>
              <option value="PE">Peru</option>
              <option value="PL">Polônia</option>
              <option value="PT">Portugal</option>
              <option value="KE">Quênia</option>
              <option value="KG">Quirguistão</option>
              <option value="GB">Reino Unido</option>
              <option value="CF">República Centro Africana</option>
              <option value="KR">República da Coréia</option>
              <option value="CD">República Democrática do Congo</option>
              <option value="DO">República Dominicana</option>
              <option value="KP">República Popular Democrática da Coréia</option>
              <option value="CZ">República Tcheca</option>
              <option value="RO">Romênia</option>
              <option value="RW">Ruanda</option>
              <option value="RU">Rússia (Federação Russa)</option>
              <option value="WS">Samoa</option>
              <option value="SM">San Marino</option>
              <option value="LC">Santa Lúcia</option>
              <option value="KN">São Cristóvão e Nevis</option>
              <option value="ST">São Tomé e Príncipe</option>
              <option value="VC">São Vicente e Granadinas</option>
              <option value="SC">Seichelles</option>
              <option value="SN">Senegal</option>
              <option value="SL">Serra Leoa</option>
              <option value="RS">Sérvia</option>
              <option value="SG">Singapura</option>
              <option value="SY">Síria</option>
              <option value="SO">Somália</option>
              <option value="LK">Sri Lanka</option>
              <option value="SD">Sudão</option>
              <option value="SS">Sudão do Sul</option>
              <option value="SE">Suécia</option>
              <option value="CH">Suíça</option>
              <option value="SR">Suriname</option>
              <option value="TJ">Tadjiquistão</option>
              <option value="TH">Tailândia</option>
              <option value="TZ">Tanzânia</option>
              <option value="TL">Timor Leste</option>
              <option value="TG">Togo</option>
              <option value="TO">Tonga</option>
              <option value="TT">Trinidad e Tobago</option>
              <option value="TN">Tunísia</option>
              <option value="TM">Turcomenistão</option>
              <option value="TR">Turquia</option>
              <option value="TV">Tuvalu</option>
              <option value="UA">Ucrânia</option>
              <option value="UG">Uganda</option>
              <option value="UY">Uruguai</option>
              <option value="UZ">Uzbequistão</option>
              <option value="VU">Vanuatu</option>
              <option value="VE">Venezuela</option>
              <option value="VN">Vietnã</option>
              <option value="ZM">Zâmbia</option>
              <option value="ZW">Zimbábue</option>
            </select>

          </div>
          
           <div className="input-group w-100">

            <label className="input-group-text">Indicadores</label>
            <select onChange={t => setType(t.target.value)} className="form-select" defaultValue=''>
              <option value="" disabled hidden>Selecione um indicador</option>
              <option value="77818">Economia - Chegada de turistas</option>
              <option value="77819">Economia - Gastos públicos com educação</option>
              <option value="77820">Economia - Gastos públicos com saúde</option>
              <option value="77821">Economia - Investimentos em pesquisa e desenvolvimento</option>
              <option value="77822">Economia - Mulheres de 15 anos ou mais de idade economicamente ativas</option>
              <option value="77823">Economia - PIB per capita</option>
              <option value="77824">Economia - População de 15 anos ou mais de idade economicamente ativa</option>
              <option value="77825">Economia - Total de exportações</option>
              <option value="77826">Economia - Total de importações</option>
              <option value="77827">Economia - Total do PIB</option>
              <option value="77830">Indicadores sociais - Esperança de vida ao nascer</option>
              <option value="77831">Indicadores sociais - Índice de desenvolvimento humano</option>
              <option value="77832">Indicadores sociais - População com acesso à água potável</option>
              <option value="77833">Indicadores sociais - População com acesso à rede sanitária</option>
              <option value="77835">Indicadores sociais - Taxa bruta de matrículas para todos os níveis de ensino</option>
              <option value="77836">Indicadores sociais - Taxa de alfabetização das pessoas de 15 anos ou mais de idade</option>
              <option value="77838">Meio Ambiente - Áreas cultivadas</option>
              <option value="77839">Meio Ambiente - Áreas de pastagens permanentes</option>
              <option value="77840">Meio Ambiente - Áreas protegidas no total do território nacional</option>
              <option value="77841">Meio Ambiente - Produção de gás natural</option>
              <option value="77842">Meio Ambiente - Produção de petróleo</option>
              <option value="77844">População - Densidade demográfica</option>
              <option value="77845">População - Homens</option>
              <option value="77846">População - Mulheres</option>
              <option value="77847">População - População residente em área rural</option>
              <option value="77848">População - População residente em área urbana</option>
              <option value="77849">População - População</option>
              <option value="77850">População - Taxa bruta de mortalidade</option>
              <option value="77851">População - Taxa bruta de natalidade</option>
              <option value="77852">População - Taxa média anual do crescimento da população</option>
              <option value="77854">Redes - Assinaturas de telefonia celular</option>
              <option value="77855">Redes - Assinaturas de telefonia fixa</option>
              <option value="77857">Redes - Indivíduos com acesso à internet</option>
              <option value="77829">Saúde - Consumo calórico</option>
              <option value="77834">Saúde - Incidência de subnutrição</option>

            </select>

          </div>
          
          </div>
          <a target='blank' href='https://brasil.un.org/pt-br'><img src="src/assets/onusymbol.png" alt="Logo Branco da ONU - Organização das Nações Unidas"/></a>
        </div>

        <div className='button-box'>
          <button type="button" onClick={clickButton} className="btn btn-outline-light">Buscar</button>
        </div>
      </div>
      <div className='output-box'>
            {countryData && flagData? 
            <>
              
              <table className="info-box">
              
                <tr>
                  <th><span>{onchange = `${countryName} (${country})`}</span></th>
                </tr>

                <tr>
                  <td><img src={flagData} alt={countryName}/></td>
                </tr>

                <tr>
                  <td>Nome: {countryName}</td>
                </tr>

                <tr>
                  <td>Capital: {countryCapital} </td>
                </tr>

                <tr>
                  <td>Lingua: {countryLanguage} </td>
                </tr>

                <tr>
                  <td>Continente: {countryContinent} </td>
                </tr>

                <tr>
                  <td>Região Intermediária: {countryInterRegion} </td>
                </tr>

                <tr>
                  <td>Sub-Região: {countrySubregion} </td>
                </tr>

                <tr>
                  <td>Unidade Monetária: {moneySymbol} </td>
                </tr>
                
              </table>

              <div>
              <h2 id='descricao'>DESCRIÇÃO DO PAÍS</h2>    
            <div className='description-box'>
              <p>{countryDesc && `‎ ‎ ‎ ‎ ${countryDesc}`}</p>
            </div>

            <h2>INDICADORES DE 2018 A 2020</h2>
            
            <div className='type-box'>
            <h5>{typeName}</h5>
            <h5 id='error'>{error?`${error}`:''}</h5>
            </div>
            
            <div className='value-box'>
              <div className='year-box'>
                <span id='data-value'>{countryValue0 && `2018 -> ${countryValue0} ${countryUnity}`}</span>
              </div>
                
              <div className='year-box'>
                <span id='data-value'>{countryValue1 && `2019 -> ${countryValue1} ${countryUnity}`}</span>
              </div>
              
              <div className='year-box'>
                <span id='data-value'>{countryValue2 && `2020 -> ${countryValue2} ${countryUnity}`}</span>
              </div>
            </div>
            </div>
            </>

            :<div></div>}
          </div>
          <div className='powered-box'>
          <span hre>POWERED by:</span>
          <span>||</span>
          <a target='blank' href='https://servicodados.ibge.gov.br/api/docs/paises#api-_'>IBGE (API)</a>
          <span>||</span>
          <a target='blank' href='https://restcountries.com/#rest-countries'>REST COUNTRIES (API)</a>
          <span>||</span>
          <a target='blank' href='https://flagpedia.net/download/api'>FLAGS CDN (API)</a>
          <span>||</span>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App



