import Header from "./components/header/Header.jsx";
import Pages from "./pages/pages.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
  const token = localStorage.getItem('Token')
  return (
    <div className="App bg-gray-400 dark:bg-gray-800 dark:text-white min-h-[100vh] grid grid-rows-[auto_1fr_auto]">
      {token && <Header/>}
      <Pages />
      <Footer />
    </div>
  )
}

export default App
