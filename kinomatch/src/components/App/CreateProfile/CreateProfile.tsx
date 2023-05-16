import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { AuthContext } from '../../../contexts/AuthContext';

import './CreateProfile.scss';

const CreateProfile = () => {
  const [postProfil, setPostProfil] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { isLoggedIn, login } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [goToHomePage, setGoToHomePage] = useState(false);

  const handleChange = (event) => {
    const value = event.target.value;
    setPostProfil({
      ...postProfil,
      [event.target.name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);

    const userData = {
      email: postProfil.email,
      password: postProfil.password,
      passwordConfirm: postProfil.passwordConfirm,
    };

    try {
      const response = await axios.post('http://localhost:4000/signup', userData);
      console.log(response.status, response.data.token);
      login();
      setTimeout(() => {
      setGoToHomePage(true);
      }, 1000);
    } catch (error) {
      console.log('Error:', error);
    }

    console.log(isLoggedIn)

  };

  if (goToHomePage) {
    return <Navigate to="/" />;
  }

  return (
    <div className='CreateProfile-container'>
      <form className='CreateProfile-container-form' onSubmit={handleSubmit}>
        <label htmlFor='email'>Votre email</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
          type='email'
          id='email'
          name='email'
          required
          placeholder='votre@email.com'
        />

        <label htmlFor='password'>Votre mot de passe</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
          type='password'
          id='password'
          name='password'
          required
          placeholder='v0tr3MdP1c1'
        />

        <label htmlFor='passwordConfirm'>Confirmez votre mot de passe</label>
        <input
          onChange={handleChange}
          className='CreateProfile-container-form-input'
          type='password'
          id='passwordConfirm'
          name='passwordConfirm'
          required
          placeholder='v0tr3MdP1c1'
        />

        <button type='submit'>CRÉER COMPTE</button>
      </form>

      {isLoading && <Loading />}
    </div>
  );
};

export default CreateProfile;
