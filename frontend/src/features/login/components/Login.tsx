import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "/@features/login/hooks/useAuth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(username, password);
      navigate("/bookings");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <main className="w-full max-w-sm">
        <h1 className="sr-only">Logga in</h1>

        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full p-10 rounded-2xl bg-green-500/10 backdrop-blur-md space-y-4"
        >
          <fieldset className="flex flex-col space-y-4">
            <legend className="sr-only">Inloggningsuppgifter</legend>

            <label className="flex flex-col text-white">
              Användarnamn
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full p-2 mt-1 rounded text-custom-green focus:outline-none"
              />
            </label>

            <label className="flex flex-col text-white">
              Lösenord
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 mt-1 rounded text-custom-green focus:outline-none"
              />
            </label>
          </fieldset>

          <button
            type="submit"
            disabled={loading}
            className="bg-custom-green text-white p-2 rounded hover:bg-gray-500 transition-colors"
          >
            {loading ? "Loggar in..." : "Logga in"}
          </button>

          {error && (
            <p role="alert" className="text-red-500 text-sm mt-2">
              {error}
            </p>
          )}
        </form>
      </main>
    </div>
  );
}
