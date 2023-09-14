/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {imageData} from '../data'
import toast from 'react-hot-toast';

function Profile() {
  const navigate = useNavigate();
  const [selectedImageIds, setSelectedImageIds] = useState([]);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const userDataJson = localStorage.getItem("user");
  const userData = JSON.parse(userDataJson);
  const handleImageClick = (id) => {
    if (selectedImageIds.includes(id)) {
      setSelectedImageIds(selectedImageIds.filter(imageId => imageId !== id));
    } else {
      setSelectedImageIds([...selectedImageIds, id]);
    }
  };

 

  const deleteSession = () => {
    localStorage.removeItem("user");
    toast.success("Logged Out");
    navigate('/');
  };

  const handleChangePassword = async () => {
    try {
      const url = "https://graphic-auth-server.onrender.com/api/user/password";
  
      // Create an object with the required data
      const data = {
        email: userData.email, // Assuming you have access to user's email
        currentPassword: oldPassword,
        newPassword,
      };
  
      // Make a POST request to the server
      const response = await axios.put(url, data);
  
      if (response.status === 200) {
        // Password changed successfully
        toast.success("Password changed successfully");
        navigate('/')
      } else {
        // Handle other responses or errors here
        toast.error("Failed to change password");
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error(error);
      toast.error("An error occurred while changing the password");
    }
  };
  
  const handleImageChange = async () => {
    try {
      const url = "https://graphic-auth-server.onrender.com/api/user/image";
      const imagearr= selectedImageIds.join(',');
      // Create an object with the required data
      const data = {
        email: userData.email, // Assuming you have access to user's email
        imagearr,
      };

      // Make a POST request to the server
      const response = await axios.put(url, data);

      if (response.status === 200) {
        // Image array changed successfully
        toast.success("Image password updated successfully");
        navigate('/')
      } else {
        // Handle other responses or errors here
        toast.error("Failed to update image array");
      }
    } catch (error) {
      // Handle any network or server errors here
      console.error(error);
      toast.error("An error occurred while updating the image array");
    }
  };


  return (
    <div className="min-h-screen flex flex-col gap-y-4 items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        {userData ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h1>
            <p className="text-lg mb-2">Email: <span className='font-bold'>{userData.email}</span> </p>
            {/* Render other user data */}
          </div>
        ) : (
          <p>Loading user data...</p>
        )}

        <button
          onClick={deleteSession}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out"
        >
          LogOut
        </button>
        <button
          className='bg-blue-400 ml-4 text-white py-2 px-4 rounded-md font-semibold'
          onClick={() => navigate('/')}
        >
          Back to Home
        </button>

        {/* Add input fields for old and new passwords */}
        <div className="mt-4">
          <label htmlFor="oldPassword" className="text-lg font-semibold">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full py-2 px-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        <div className="mt-4">
          <label htmlFor="newPassword" className="text-lg font-semibold">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full py-2 px-3 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
          />
        </div>

        {/* Add a submit button to change the password */}
        <button
          onClick={handleChangePassword}
          className="mt-4 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out"
        >
          Change Password
        </button>

      </div>
      <div className="grid grid-cols-3 gap-1 ">
          
          {imageData.map((data) => (
            <div
              key={data.id}
              className={`flex justify-center ${selectedImageIds.includes(data.id) ? 'border-2 border-indigo-400' : ''}`}
              onClick={() => handleImageClick(data.id)}
            >
              <img
                src={data.image}
                alt={`Image ${data.id}`}
                className="max-h-32  hover:opacity-50 object-contain"
              />
            </div>
          ))}
        </div>
        <button onClick={handleImageChange}
          className="mt-4 mb-5 bg-blue-400 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-semibold transition duration-300 ease-in-out"      >change images</button>
    </div>
  );
}

export default Profile;
