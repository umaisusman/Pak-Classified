import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ScrollToTop } from "./utils/scrollOnTop";
import { NavbarComponent } from "./components/NavbarComponent";
import Footer from "./components/Footer";
import AboutUsPage from "./pages/AboutUsPage/AboutUsPage.jsx";
import CategoryPage from "./pages/CategoryPage/CategoryPage.jsx";
import { ContactPage } from "./pages/ContactPage/ContactPage.jsx";
import { DetailsPage } from "./pages/DetailsPage/DetailsPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import PostAdvertisement from "./pages/PostAdvertisement/PostAdvertisement.jsx"; // Corrected import statement
import AdminPage from "./pages/AdminPage";
import AuthPage from "./pages/AuthPage/AuthPage.jsx";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.jsx";
import ChatPage from "./pages/ChatPage/ChatPage.jsx";
import CategoryDetail from "./pages/CategoryDetail.jsx";

function App() {
  return (
    <div className="container">
      <Router>
        <ScrollToTop />
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:id" element={<CategoryDetail />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/ads/:id" element={<DetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/postad" element={<PostAdvertisement />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route path="*" element={<NotFoundPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
