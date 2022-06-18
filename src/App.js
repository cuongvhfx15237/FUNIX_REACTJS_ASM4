import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Header from "./components/HeaderComponent";
import Footer from "./components/FooterComponent";
import Main from './components/MainComponent';
import { Provider } from 'react-redux';
import { ConfigureStore } from './redux/configureStore'

const store = ConfigureStore();
debugger
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
