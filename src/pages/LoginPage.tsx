import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/Store/authStore";

function LoginPage() {
  const [name, setName] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = (): void => {
    login(name);
    navigate("/reservations");
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Login</h2>

      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
        </div>

        <Button onClick={handleLogin} disabled={name.trim() === ""} className="w-full">
          Log In
        </Button>
      </div>
    </div>
  );
}

export default LoginPage;