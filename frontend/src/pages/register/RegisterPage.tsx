import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "../../supbaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async ( email: string, password: string) => {
    console.log(email);
    console.log(password);
    const { error } = await supabase.auth.signUp({email, password, options: {
    emailRedirectTo: `${window.location.origin}/dashboard`
  }})

    if (error) {
      console.error(error);
      toast.error(`Error: ${error}`)
    }
    else {
      toast.success("Check email for confirmation!😁")
      
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-white px-4">
      <div className="max-w-md w-full bg6 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">
          Create an Account
        </h2>
        <form onSubmit={(e) => {
          e.preventDefault();

          if(password !== confirmPw) {
            toast.error("Passwords do not match.😥")
            return;
          }

          if(password.length < 8) {
            toast.error("Password must be at least 8 characters long")
            return;
          }
          
          setLoading(true);
          handleRegister(email, password).finally(() => setLoading(false));
        }

        } className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-md text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Confirm Password</label>
            <input
              type="password"
              className="w-full p-2 rounded-md text-black"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 font-semibold transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
