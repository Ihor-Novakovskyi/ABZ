import logo from './logo.svg';
import './App.css';
import Header from './Header/Header';
import UsersBlock from './UserBlock/UsersBlock';
import RegistrationForm from './RegistrationForm/RegistrationForm';
import { useEffect, useState } from 'react';
import SucessRegistration from './SuccessfulRegistration/SucessRegistration';
function MainPage() {
  const [token, setToken] = useState('');
  const [{update, problemRegistration}, setRegistraion] = useState({update: false, problemRegistration: false});
  useEffect(() => { 
     fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then(response => response.json())
      .then(response => setToken(response.token))
  }, [])
  console.log(token)
  return (
    <main className='main-page'>
      <Header />
      <UsersBlock token={ token } update={update} />
      <RegistrationForm token={ token } setRegistraion={ setRegistraion } />
      { (update && !problemRegistration) ? <SucessRegistration /> : null}
      { problemRegistration ? <h1 className='main-page__message-proble-server'>Sorry... try latter</h1> : null }
    </main>
  );
}

export default MainPage;
