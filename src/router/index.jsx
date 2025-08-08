import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage/Home'
import WebSite from '../layouts/WebSite'
import Login from '../pages/Auth/Login'
import DefultError from '../component/Errors/DefultError'
import TestForm from '../pages/HomePage/TestForm'
import Register from '../pages/Auth/Register'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login /> } />
                    <Route path='/register' element={<Register /> } />
                    <Route path='/TestForm' element={<TestForm /> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
