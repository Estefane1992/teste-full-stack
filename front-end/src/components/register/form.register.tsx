'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ButtonContained, ButtonOutlined } from '../button';
import Link from 'next/link';

export default function FormRegister() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!emailPattern.test(formData.email)) {
            setMessage('Por favor, insira um email válido.');
            setIsSuccess(false);
            return;
        }
        if (formData.password.length < 8) {
            setMessage('A senha deve ter pelo menos 8 caracteres.');
            setIsSuccess(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setMessage('A senha e a confirmação de senha não coincidem.');
            setIsSuccess(false);
            return;
        }

        console.log('Dados do formulário:', formData);

        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

        setMessage('Cadastro efetuado com sucesso!');
        setIsSuccess(true);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div className='bg-[#2b2e344d] rounded-[20px] mt-[100px] mb-[100px]'>
                <form
                    onSubmit={handleSubmit}
                    className='p-16 rounded-lg flex flex-col justify-center py-auto'
                >
                    <h2 className='text-3xl pb-8 flex justify-center font-bold'>
                        Cadastre-se
                    </h2>

                    {message && (
                        <p className={isSuccess ? 'mb-[20px] text-[#2f00ff]' : 'text-red-500'}>{message}</p>
                    )}

                    <label htmlFor='name'>Nome Completo</label>
                    <input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Digite seu nome'
                        className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    <label htmlFor='email'>E-mail</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Digite seu e-mail'
                        className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor='password'>Senha (mínimo 8 caracteres)</label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Crie uma senha'
                        className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor='confirmPassword'>Confirmar Senha</label>
                    <input
                        type='password'
                        name='confirmPassword'
                        id='confirmPassword'
                        placeholder='Confirme sua senha'
                        className='mb-8 mt-2 bg-gray rounded text-dark-brown p-2 px-4'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    <ButtonOutlined>
                        {'Cadastrar-se'}
                    </ButtonOutlined>
                    <div className='mt-[20px]'>
                        <Link href={'/login'}>
                            <ButtonContained>
                        {'Fazer login'}
                        </ButtonContained>
                        
                        </Link>
                    </div>

                </form>
                
            </div>
            
        </div>
    );
}

