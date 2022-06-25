import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'
import { BrowserRouter } from 'react-router-dom';
import 'font-awesome/css/font-awesome.css';
import 'bootstrap-social/bootstrap-social.css';


const store = ConfigureStore();
function App(){
  return(
    <Provider store={store}>
      <Header/>
        <Main/>
      <Footer/>
    </Provider>

  )
}

export default App;
