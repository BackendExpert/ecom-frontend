import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage/Home'

import WebSite from '../layouts/WebSite'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route index element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
