import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './component/App'
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import {createStore} from 'redux'

interface state {
  getBy : number 
  currentPage : number 
}
const initalState : state = {
    getBy :1,
    currentPage :0
}
const rootReducers = (state =  initalState , action : any  )   =>  {
  console.log(action)  

  return state

}
const store = createStore(rootReducers) 
        
ReactDOM.render(
    <Provider store = {store} >
      <React.StrictMode> 
     <App/>
    </React.StrictMode>
    </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
