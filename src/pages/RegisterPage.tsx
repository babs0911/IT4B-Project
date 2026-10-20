import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "@/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/Store/authStore";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleRegister = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const response = await registerUser(name, email, password);
      login(response.token, response.user.name);
      navigate("/reservations");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Could not create your account.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-sm">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">Create an account</h2>
      <form onSubmit={handleRegister} className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" autoComplete="name" required maxLength={100} value={name} onChange={(event) => setName(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" autoComplete="new-password" minLength={8} required value={password} onChange={(event) => setPassword(event.target.value)} />
        </div>
        {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Creating account..." : "Register"}
        </Button>
      </form>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-300">
        Already registered? <Link className="text-blue-600 underline" to="/login">Log in</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
