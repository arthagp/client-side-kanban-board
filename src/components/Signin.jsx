'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { useFormik } from 'formik'
import { login } from '@/api/fetch'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'


const Signin = () => {
  const [inputHasFocusUsername, setInputHasFocusUsername] = useState()
  const [inputHasFocusPassword, setInputHasFocusPassword] = useState()
  const router = useRouter()

  const handleLogin = async (values) => {
    try {
      const response = await login(values.username, values.password);
      Cookies.set('token', response.token)
      Cookies.set('id', response.id)
      Cookies.set('username', response.username);
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      formik.setValues({
        username: '',
        password: '',
      })
      router.push('/')
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    }, onSubmit: values => handleLogin(values)
  })

  return (
    <div className='w-full flex justify-center items-center h-screen'>
      <div className='flex flex-col justify-center items-center h-screen'>
        <Link href={'/'}>
          <h1 className='font-bold text-6xl my-16 text-blue-400'>Boardify</h1>
        </Link>
        <p className='opacity-60 my-2'>Welcome Back!</p>
        <p className='opacity-60 mb-10'>Please Login/Signup to your account</p>
        <form className='flex flex-col w-[390px]' onSubmit={formik.handleSubmit}>
          <div className={`rounded-md flex flex-col border border-gray-300 ${inputHasFocusUsername ? 'border-l-blue-300 border-l-4' : null}`}>
            <label className={`${inputHasFocusUsername ? 'pl-[9px]' : 'pl-[12px]'} opacity-70 text-sm pt-1`} htmlFor="username">Username </label>
            <input className='focus:outline-none pl-3 text-gray-600'
              id='username'
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              onFocus={() => setInputHasFocusUsername(true)}
              onBlur={() => setInputHasFocusUsername(false)}
            />
          </div>
          <div className={`rounded-md mt-2 flex flex-col border border-gray-300 ${inputHasFocusPassword ? 'border-l-blue-300 border-l-4' : null}`}>
            <label className={`${inputHasFocusPassword ? 'pl-[9px]' : 'pl-[12px]'} opacity-70 text-sm pt-1`} htmlFor="password">Password </label>
            <input className='focus:outline-none pl-3 text-gray-600'
              id='password'
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              onFocus={() => setInputHasFocusPassword(true)}
              onBlur={() => setInputHasFocusPassword(false)}
            />
          </div>
          <div className='flex flex-col justify-center items-center gap-y-6'>
            <button type='submit' className='border-blue-400 max-w-[250px] w-full text-white font-semibold bg-blue-400 border py-[10px] px-7 mt-6 rounded-md'>Login</button>
            <p className='opacity-50'>OR</p>
            <Link href={'/register'} className='max-w-[250px] w-full'>
              <button className='border-blue-400 w-full text-blue-400 font-semibold border py-[10px] px-7 rounded-md'>SignUp</button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signin