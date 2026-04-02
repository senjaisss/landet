import { Login } from "/@features/login/components/Login";
import bgImage from "/@assets/landet2.jpg";

export function LandingPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center"
    style={{ backgroundImage: `url(${bgImage})` }}>
      <h1 className="sr-only">Logga in</h1>
      <Login />
    </div>
  );
}