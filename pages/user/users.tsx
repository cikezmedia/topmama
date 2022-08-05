import type { NextPage } from 'next';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/Navbar';
import Table from 'react-bootstrap/Table';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';

type FormValues = {
  em: string;
};

const Home: NextPage = () => {
  const [user, setUser] = useState({
    email: null,
    password: null,
  });
  const [showMessage, setShowMessage] = useState('');
  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem('user-signup')!);
    setUser(auth);
  }, []);
  const { email, password } = user;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { em } = data;
    if (em === 'eve.holt@reqres.in') {
      const userData = {
        email: em,
        password: password,
      };

      localStorage.setItem('user-signup', JSON.stringify(userData));
      setShowMessage('Email updated. Logging out...');
      setTimeout(() => {
        Router.push('/login');
      }, 3000);
    } else {
      setShowMessage(
        'For token and session to work perfectly, your email must be eve.holt@reqres.in...'
      );
    }
  };
  return (
    <>
      <div>
        <Head>
          <title>Users Page</title>
          <meta name='description' content='Generated by create next app' />
          <link rel='icon' href='/favicon.png' />
        </Head>
        <Header />
        <div className='container'>
          <h3 className='mt-5 mb-4'>All Users</h3>
          <p>Loading........</p>
        </div>
      </div>
    </>
  );
};

export default Home;