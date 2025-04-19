import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

interface FormData {
  uid: string;
  password: string;
  confirmPassword: string;
}

function Signup() {
  const [formData, setFormData] = useState<FormData>({
    uid: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/signup", {
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

      if (data.success) {
        alert("Signup successful! You can now login.");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (err) {
      setError("Error connecting to the server.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-sm mx-auto px-6 py-12">
        <h1 className="text-center text-2xl font-semibold mb-8">Signup</h1>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="UID"
            name="uid"
            value={formData.uid}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-[#273469] text-white py-2 rounded-md hover:bg-[#1e295f] transition"
          >
            Signup
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-blue-500 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
