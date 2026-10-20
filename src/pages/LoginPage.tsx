import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/Store/authStore";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await loginUser(email, password);
      login(response.token, response.user.name);
      navigate("/reservations");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not log in.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Login</h2>

      <form onSubmit={handleLogin} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Logging in..." : "Log In"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Need an account? <Link className="text-blue-600 underline" to="/register">Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;