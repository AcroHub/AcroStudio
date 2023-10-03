import { useState } from 'react';

function LoginRegister() {
  const [isLogin, setIsLogin] = useState(window.location.pathname === '/login');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const toggleIsLogin = () => {
    setIsLogin(!isLogin);
    setErrorMessage('');
    setPasswordMismatchError(false);
  };

  const handleLoginClick = async (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await fetch('http://localhost:4000/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        console.log('response', response);
        const user = await response.json();
        console.log('user', user);
        localStorage.setItem('loggedInUser', user.token);

        // set token to cookie for server side rendering
        document.cookie = `token=${user.token}; path=/; max-age=3600`;

        window.location.reload();
        window.location.href = '/';
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
  };

  const handleRegisterClick = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setPasswordMismatchError(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password }),
      });

      if (response.ok) {
        // Handle successful registration
        const user = await response.json();

        localStorage.setItem('loggedInUser', user.token);

        // set token to cookie for server side rendering
        document.cookie = `token=${user.token}; path=/; max-age=3600`;

        window.location.reload();
        window.location.href = '/';
      } else {
        const errorResponse = await response.json();
        setErrorMessage(errorResponse.message);
      }
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg dark:shadow-2xl shadow-card w-80">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
        {errorMessage && (
          <div className="bg-red-100 text-red-700 py-2 px-4 mb-4 rounded">{errorMessage}</div>
        )}
        <form onSubmit={isLogin ? handleLoginClick : handleRegisterClick}>
          {!isLogin && (
            <>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="border rounded-lg px-3 py-2 w-full"
                  type="text"
                  id="name"
                  placeholder="Enter your Name"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                  Username
                </label>
                <input
                  className="border rounded-lg px-3 py-2 w-full"
                  type="text"
                  id="username"
                  placeholder="Enter username"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="border rounded-lg px-3 py-2 w-full"
              type="password"
              id="password"
              placeholder="Enter your password"
            />
          </div>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <input
                className="border rounded-lg px-3 py-2 w-full"
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
              />
              {passwordMismatchError && (
                <p className="text-red-700 mt-2">Passwords do not match. Please try again.</p>
              )}
            </div>
          )}
          <div className="text-center">
            <button
              className="bg-red-500 text-white hover:bg-transparent border border-red-600 hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {isLogin ? 'Login' : 'Register'}
            </button><br />
            <button
              className="text-red-400 hover:text-red-600 font-semibold focus:outline-none"
              type="button"
              onClick={toggleIsLogin}
            >
              {isLogin ? 'Create an account' : 'Already have an account?'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginRegister;