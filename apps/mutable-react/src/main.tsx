import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import TodoApp from "./TodoApp";
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <TodoApp/>
  </React.StrictMode>
)
