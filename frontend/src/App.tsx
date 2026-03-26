import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingsPage } from "./pages/BookingsPage";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedRoute } from "./features/login/components/ProtectedRoutes";
import { CreateBookingsPage } from "./pages/CreateBookingPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <BookingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-booking"
          element={
            <ProtectedRoute>
              <CreateBookingsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;