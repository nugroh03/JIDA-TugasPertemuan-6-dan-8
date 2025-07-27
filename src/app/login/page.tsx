'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeOff, Anchor } from 'lucide-react';
import { signIn } from 'next-auth/react';

export default function Login() {
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState('');

  // const { login } = useAuth();
  // const router = useRouter();

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  //   setError('');
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError('');

  //   try {
  //     const response = await fetch('/api/v1/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       login(data.token);
  //       router.push('/dashboard');
  //     } else {
  //       setError(data.message || 'Login gagal');
  //     }
  //   } catch (error) {
  //     setError('Terjadi kesalahan. Silakan coba lagi.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // NEW STEP LOGIN

  const router = useRouter(); // tambahkan ini

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const [registerEmail, setRegisterEmail] = useState('');
  // const [registerPassword, setRegisterPassword] = useState('');
  // const [registerName, setRegisterName] = useState('');

  // const handleRegister = async () => {
  //   const res = await fetch('/api/auth/signup', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email: registerEmail,
  //       password: registerPassword,
  //       name: registerName,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   });

  //   const data = await res.json();
  //   if (res.ok) {
  //     alert('Register success');
  //   } else {
  //     alert(data.error || 'Register failed');
  //   }
  // };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    console.log(email, password);
    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    console.log(res);

    if (res?.error) {
      setIsLoading(false);
      alert(res.error);
    } else {
      console.log('DONE LOGIN');

      // setIsLoading(false);
      router.push('/dashboard'); // ganti ke halaman tujuanmu
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-teal-700 flex items-center justify-center p-4'>
      <div className='absolute inset-0'>
        <Image
          src='https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=1200'
          alt='Marina Background'
          fill
          className='object-cover opacity-20'
        />
      </div>

      <div className='relative w-full max-w-md'>
        <div className='bg-white rounded-2xl shadow-2xl p-8'>
          <div className='text-center mb-8'>
            <div className='flex justify-center mb-4'>
              <div className='w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center'>
                <Anchor className='h-8 w-8 text-white' />
              </div>
            </div>
            <h1 className='text-2xl font-bold text-gray-900 mb-2'>Login</h1>
            <p className='text-gray-600'>Masuk ke dashboard Marina Boat</p>
          </div>

          {/* {error && (
            <div className='mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center'>
              <AlertCircle className='h-5 w-5 text-red-600 mr-2 flex-shrink-0' />
              <span className='text-red-800 text-sm'>{error}</span>
            </div>
          )} */}

          <form onSubmit={handleLogin} className='space-y-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                placeholder='Masukkan email anda'
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className='w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                  placeholder='Masukkan password'
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPassword ? (
                    <EyeOff className='h-5 w-5' />
                  ) : (
                    <Eye className='h-5 w-5' />
                  )}
                </button>
              </div>
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className='w-full bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
            >
              {isLoading ? (
                <>
                  <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                  Memproses...
                </>
              ) : (
                'Masuk'
              )}
            </button>
            <button
              type='button'
              onClick={() => router.push('/signup')}
              className='w-full  text-blue-700 py-3 px-4 rounded-lg font-semibold border border-gray-700 hover:bg-gray-500 hover:text-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center'
            >
              Register
            </button>
          </form>

          {/* <div className='mt-6 p-4 bg-blue-50 rounded-lg'>
            <p className='text-sm text-blue-800 text-center'>
              <strong>Demo Login Admin:</strong>
              <br />
              Email: admin1@gmail.com
              <br />
              Password: admin123+
            </p>

            <p className='text-sm text-blue-800 text-center'>
              <strong>Demo Login User:</strong>
              <br />
              Email: user1@gmail.com
              <br />
              Password: 123456
            </p>
          </div> */}
        </div>
      </div>
    </div>
  );
}
