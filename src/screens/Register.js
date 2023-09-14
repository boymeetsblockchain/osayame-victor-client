/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {useState } from 'react'
import {imageData} from '../data'
import axios from 'axios'
import AuthContext from '../context/authContext'
import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import {AiOutlineEye} from 'react-icons'
const Register = () => {
 
  const {setUser}= useContext(AuthContext)
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [name,setName]=useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const navigate= useNavigate()
  const handleImageClick = (id) => {
    if (selectedImageIds.includes(id)) {
      setSelectedImageIds(selectedImageIds.filter(imageId => imageId !== id));
    } else {
      setSelectedImageIds([...selectedImageIds, id]);
    }
  };
  const imagearr= selectedImageIds.join(',');

  const url= "https://graphic-auth-server.onrender.com/api/user/register"

const handleSubmit = async (e) => {
  e.preventDefault();
  const userdata = { name, email, password, imagearr }
  console.log(selectedImageIds)
 
  if(password.length < 6){
    toast.error("Password is weak,choose a stronger password")
  }else if (selectedImageIds.length < 3){
  toast.error("Please select 3 or more images")
  }
  else{
    try {
      const response = await axios.post(url, userdata, { withCredentials: true }); // Add withCredentials: true
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
        toast.success("registered in")
        navigate('/')
      }
      return response.data
  
    } catch (error) {
      toast.error("Invalid crede")
      console.error(error)
    }
    
    setSelectedImageIds([]);
  }
 
};

  return (
    <>

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium  leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  autoComplete="name"
                  required
                  onChange={(e)=>setName(e.target.value)}
                  className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-xl font-medium  leading-6 text-gray-900">
                Email 
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  required
                  onChange={(e)=>setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300
                   placeholder:text-gray-400  focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center">
                <label htmlFor="password" className="block   text-xl font-medium leading-6 text-gray-900">
                  Password
                </label>
        
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  autoComplete="current-password"
                  required
                  onChange={(e)=>setPassword(e.target.value)}
                  className="block w-full rounded-md border-0  py-3
                   text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="data-select">
            <h1 className='font-bold text-lg text-center my-4'>Please Select  3 or more Images</h1>
        <div className="grid grid-cols-3 gap-4 ">
          {imageData.map((data) => (
            <div
              key={data.id}
              className={`flex justify-center ${selectedImageIds.includes(data.id) ? 'border-2 border-indigo-400' : ''}`}
              onClick={() => handleImageClick(data.id)}
            >
              <img
                src={data.image}
                alt={`Image ${data.id}`}
                className="max-h-64  hover:opacity-50 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
            <p className='text-center mt-2'>Dont have an account? <Link to={'/login'} className='text-purple-500'>SignIn</Link></p>
          </form>

        
        </div>
      </div>
    </>
  )
}

export default Register