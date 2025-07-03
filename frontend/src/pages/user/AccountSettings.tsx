import { useEffect, useState } from "react";
import { supabase } from "../../supbaseClient";
import { toast } from "sonner";
import Spinner from "../../components/skeleton/Spinner";

export default function AccountSettings() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

   const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if(newPassword.length < 8) {
        toast.error("Password must be at least 8 characters.")
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast.error("Error updating password: " + error.message);
    } else {
      toast.success("Password updated successfully.");
      setNewPassword("");
      setConfirmNewPassword("");
    }
    setLoading(false);
  };
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        toast.error("Failed to fetch user.");
        return;
      }

      setEmail(user.email || "");
    };

    getUser();
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-900 text-black dark:text-white my-12">
      <h2 className="text-2xl font-bold mb-4">Account Settings</h2>
     <p className="mb-6 text-gray-300">Logged in as <strong>{email}</strong></p>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md mb-4 text-black" 
        />
        <label className="block text-sm font-medium mb-1">Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            className="w-full p-2 rounded  text-black"
            required
          />
        <button
          onClick={handlePasswordUpdate}
          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {loading ? <div className="flex flex-col items-center justify-center"><Spinner /></div> : "Update Password"}
        </button>
      </div>
    </div>
    </div>
  );
}

