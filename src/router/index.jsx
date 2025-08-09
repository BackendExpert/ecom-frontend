import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/HomePage/Home'
import WebSite from '../layouts/WebSite'
import Login from '../pages/Auth/Login'
import DefultError from '../component/Errors/DefultError'
import TestForm from '../pages/HomePage/TestForm'
import Register from '../pages/Auth/Register'
import EmailVerify from '../pages/Auth/EmailVerify'
import PrivateRoute from './PrivateRoute'
import Dashboard from '../layouts/Dashboard'
import DashHome from '../pages/Dashboard/DashHome'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError /> } />
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register /> } />
                    <Route path='/email-verify' element={<EmailVerify /> } />
                    <Route path='/login' element={<Login /> } />
                    <Route path='/TestForm' element={<TestForm /> } />
                </Route>

                <Route path='/Dashboard/' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><Dashboard /></PrivateRoute>}>
                    <Route path='Home' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><DashHome /></PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
