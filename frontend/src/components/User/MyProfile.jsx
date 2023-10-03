import { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";

function MyProfile() {
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = document.cookie.split('=')[1];

    axios.get(`http://localhost:4000/api/v1/me/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        setUserDetails(response.data.user);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl pt-48 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-4 py-2 sm:px-6">
            <h1 className="text-2xl font-bold">My Profile</h1>
          </div>
          <div className="px-4 py-5 sm:px-6 flex items-center bg-gray-100">
            <img src={userDetails.avatar.url} alt="User avatar" className="w-36 h-36 rounded-full mr-4 shadow-md" />
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {userDetails.name}
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              <div className="px-4 py-5 bg-gray-100 rounded-lg shadow-md">
                <dt className="text-sm font-medium text-gray-500">Full name :</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails.name}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-100 rounded-lg shadow-md">
                <dt className="text-sm font-medium text-gray-500">Username :</dt>
                <dd className="mt-1 text-sm text-gray-900">@{userDetails.username}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-100 rounded-lg shadow-md">
                <dt className="text-sm font-medium text-gray-500">Email :</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails.email}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-100 rounded-lg shadow-md">
                <dt className="text-sm font-medium text-gray-500">Role :</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails.role}</dd>
              </div>
              <div className="px-4 py-5 bg-gray-100 rounded-lg shadow-md">
                <dt className="text-sm font-medium text-gray-500">Joined on :</dt>
                <dd className="mt-1 text-sm text-gray-900">{userDetails.createdAt}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
