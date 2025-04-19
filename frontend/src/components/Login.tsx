import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface FormData {
  uid: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormData>({ uid: "", password: "" });
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", { // Updated URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uid: formData.uid,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid login credentials");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="w-full max-w-sm mx-auto px-8 py-12 bg-white rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-semibold text-gray-700 mb-8">Welcome back!</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              placeholder="UID"
              name="uid"
              value={formData.uid}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-500"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#273469] text-white py-3 rounded-lg hover:bg-[#1e295f] transition-all"
            >
              Login
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Signup here
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
