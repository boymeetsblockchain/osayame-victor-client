import toast from 'react-hot-toast'
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const userDataJson = localStorage.getItem("user");
  const userData = JSON.parse(userDataJson);

  const deleteSession = () => {
    localStorage.removeItem("user");
    toast.success("logged Out")
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
        <button  className='bg-blue-400  ml-4  text-white py-2 px-4 rounded-md font-semibold '
         onClick={()=>navigate('/')}>
          back to home
        </button>
      </div>
    </div>
  );
}

export default Profile;
