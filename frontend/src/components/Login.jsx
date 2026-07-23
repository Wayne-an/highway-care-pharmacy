import { useState } from "react";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      onLogin(data.user);

    } catch (error) {

      setError(error.message);

    } finally {

      setLoading(false);

    }
  }

  return (

    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">

        <div className="text-center mb-8">

          <div className="text-5xl mb-4">
            💊
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Highway Care Pharmacy
          </h1>

          <p className="text-gray-500 mt-2">
            Pharmacy Management System
          </p>

        </div>


        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="block font-semibold mb-2">
              Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>


          <div>

            <label className="block font-semibold mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-green-500 outline-none"
            />

          </div>


          {error && (

            <div className="bg-red-100 text-red-700 p-3 rounded-lg">
              {error}
            </div>

          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400"
          >

            {loading
              ? "Logging in..."
              : "Login"}

          </button>

        </form>


        <p className="text-center text-gray-400 text-sm mt-8">
          Secure pharmacy management system 🔐
        </p>

      </div>

    </div>

  );
}

export default Login;