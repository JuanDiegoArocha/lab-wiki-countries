import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import CountriesList from './components/CountriesList';
import CountryDetails from './components/CountryDetails';
import countriesData from './countries.json';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    // Efecto de efecto secundario para realizar la llamada a la API y obtener los datos de los países
    const fetchData = async () => {
      try {
        // Realizar la llamada a la API utilizando Axios
        const response = await axios.get('https://ih-countries-api.herokuapp.com/countries');
        // Obtener los datos de la respuesta y establecer el estado de los países
        setCountries(response.data);
      } catch (error) {
        console.error('Error al obtener los datos de los países:', error);
      }
    };

    // Llamar a la función fetchData al cargar el componente por primera vez (usando [] como dependencia)
    fetchData();
  }, []);

  const handleCountryClick = (alpha3Code) => {
    // Buscar el país seleccionado en la lista de países utilizando el código alpha3Code
    const country = countries.find((pais) => pais.alpha3Code === alpha3Code);
    // Establecer el estado del país seleccionado
    setSelectedCountry(country);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row">
          {/* Pasar la lista de países y la función de controlador de clics al componente CountriesList */}
          <CountriesList countries={countries} onCountryClick={handleCountryClick} />
          {/* Renderizar el componente CountryDetails solo si hay un país seleccionado */}
          {selectedCountry && <CountryDetails country={selectedCountry} />}
        </div>
      </div>
    </div>
  );
}

export default App;
