import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom'

// সার্ভিস ওয়ার্কার আর নিবন্ধন করা হয় না — ওটি পুরনো index.html
// ধরে রেখে সাইট ফাঁকা করে দিত। /sw.js এখনও আছে, তবে সেটি কেবল
// আগের কপিটি মুছে নিজেকে বাতিল করার জন্য; নতুন করে বসে না।

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
)

