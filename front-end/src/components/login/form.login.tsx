'use client'
import Link from 'next/link';
import { SetStateAction, useState } from 'react';
import { ButtonContained } from '../button/button.container';
import { ButtonOutlined } from '../button/button.outlined';

export default function FormLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
  };

  const isEmailValid = (email: string) => {
    
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isEmailValid(email)) {
      setError('Por favor, insira um email válido.');
      return;
    }
    if (password.length < 8) {
      setError('A senha deve ter pelo menos 8 caracteres.');
      return;
    }
    window.location.href = '/beers';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div className='bg-[#2b2e344d]  rounded-lg mt-[100px] mb-[100px]'>
        
        <form
        onSubmit={handleSubmit}
        className= 'bg-opacity-50 p-16 rounded-lg flex flex-col justify-center py-auto'
      >
        <h2 className='text-3xl pb-8 flex justify-center font-bold'>
          Faça Login
        </h2>
        <label htmlFor='email'>E-mail</label>
        <input
          type='email'
          name='email'
          id='email'
          placeholder='Digite seu e-mail'
          className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
          value={email}
          onChange={handleEmailChange}
          required
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='Digite sua senha'
          className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
          value={password}
          onChange={handlePasswordChange}
          required
        />

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <div className='flex items-center justify-between'>
          <div className='flex items-center'>
            <input
              id='remember_me'
              name='remember_me'
              type='checkbox'
              className='h-4 w-4 '
            />
            <label
              htmlFor='remember_me'
              className='ml-2 mr-5 block text-sm text-gray-900'
            >
              Lembre-me
            </label>
          </div>

          <div className='text-sm'>
            <Link href='#' className='hover:underline'>
              Esqueceu sua senha?
            </Link>
          </div>
        </div>
        <div className='flex flex-col mt-10'>
          <ButtonContained type='submit'>Entrar</ButtonContained>
          <Link href={'/register'} className='mt-8'>
            <ButtonOutlined>
              {'Fazer cadastro'}
            </ButtonOutlined>
          </Link>
        </div>
      </form>
      </div>
    </div>
  );
}
