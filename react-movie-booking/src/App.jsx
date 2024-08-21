import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import HomePage from "./page/HomePage";
import MoviePage from "./page/MoviePage";
import AddMoviePage from "./page/AddMoviePage";
import AdminMoviePage from "./page/AdminMoviePage";
import UpdateMoviePage from "./page/UpdateMoviePage";
import BookingPage from "./page/BookingPage";
import LoginPage from "./page/LoginPage";
import RegisterPage from "./page/RegisterPage";
import AddShowtimePage from "./page/AddShowtimePage";
import UpdateSTPage from "./page/UpdateSTPage";
import HistoryPage from "./page/HistoryPage";
import AdminHistoryPage from "./page/AdminHistoryPage";
import Logout from "./components/Logout";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserProvider } from "./context/UserContext";

export default function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/movie/:id/:stid" element={<ProtectedRoute element={BookingPage} allowedRoles={['[ROLE_USER]', '[ROLE_ADMIN]']} />} />
          <Route path="/admin/addmovie" element={<ProtectedRoute element={AddMoviePage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/admin/movielist" element={<ProtectedRoute element={AdminMoviePage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/admin/updatemovie/:id" element={<ProtectedRoute element={UpdateMoviePage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/admin/addshowtime/:id" element={<ProtectedRoute element={AddShowtimePage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/admin/updateshowtime/:stid" element={<ProtectedRoute element={UpdateSTPage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/admin/bookinglist" element={<ProtectedRoute element={AdminHistoryPage} allowedRoles={['[ROLE_ADMIN]']} />} />
          <Route path="/user/booking" element={<ProtectedRoute element={HistoryPage} allowedRoles={['[ROLE_USER]']} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>

  )
}
