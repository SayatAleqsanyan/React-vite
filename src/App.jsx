import LogInForm from "./pages/loginForm/LogInForm.jsx";
import Header from "./components/header/Header.jsx";
import Pages from "./pages/pages.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  const token = localStorage.getItem('Token')
  return (
    <div>
      {token && <Header/>}
      <Pages />
      <Footer />
    </div>
  )
}

export default App
