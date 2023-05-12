import './App.css';
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";
import { initializeApp } from "firebase/app";
import firebaseConfig from './config/firebaseConfig.json'

function App() {
  initializeApp(firebaseConfig);
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
