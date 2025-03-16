import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import { useUser } from "../../context/UserContext";

export default function SignUpForm() {
  const { setUserInfo } = useUser(); // Accès au contexte
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role] = useState("admin");
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password.trim() || !username.trim()) {
      alert("All fields are required");
      return;
    }

    const fullName = `${firstName} ${lastName}`;

    try {
      const body = {
        full_name: fullName,
        email,
        username,
        password,
        role,
      };

      const response = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to sign up");
      }

      // ✅ Mettre à jour le contexte après une inscription réussie
      setUserInfo({
        firstName,
        lastName,
        email,
        username,
      });

      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setUsername("");

      navigate('/signin');
      alert("Sign up successful!");
    } catch (error: any) {
      console.error("Sign up error:", error.message);
      alert(`Sign up failed: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 sm:p-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 mb-5"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back to dashboard
        </Link>

        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
          Sign Up
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Enter your details to sign up!
        </p>
         
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <Label>
              UserName<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
            />
          </div>

          {/* First Name */}
          <div>
            <Label>
              First Name<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />
          </div>

          {/* Last Name */}
          <div>
            <Label>
              Last Name<span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
            />
          </div>

          {/* Email */}
          <div>
            <Label>
              Email<span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <Label>
              Password<span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <EyeCloseIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                )}
              </span>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <Checkbox
              className="w-5 h-5"
              checked={isChecked}
              onChange={() => setIsChecked(!isChecked)}
            />
            <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              By creating an account, you agree to the{" "}
              <Link to="/terms" className="text-blue-500 hover:underline">
                Terms and Conditions
              </Link>{" "}
              and our{" "}
              <Link to="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
            disabled={!isChecked}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
