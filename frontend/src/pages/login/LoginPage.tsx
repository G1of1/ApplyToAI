// LoginPage.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supbaseClient';
import { toast } from 'sonner';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (email:string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({email, password});
    
    if(error) {
      console.error(`Error loggin in: ${error}`)
      toast.error(`${error}`)
    }

    else {
      toast.success("Successfully logged in!😁")
      navigate("/dashboard")
    }


  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
        <div className="max-w-md w-full bg6 p-8 rounded-xl shadow-lg">
      <form onSubmit={(e) => 
        {
          e.preventDefault();
          setLoading(true);
          handleLogin(email, password).finally(() => setLoading(false))

      }} className="space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded mb-3 text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded mb-4 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button 
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
          </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-300">
          Don't have an account?{" "}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
        </div>
    </div>
  );
};

export default LoginPage;
