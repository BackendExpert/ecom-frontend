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
import Chats from '../pages/Dashboard/Chats'
import Notifications from '../pages/Dashboard/Notifications'
import DashError from '../component/Errors/DashError'
import ForgetPass from '../pages/Auth/ForgetPass'
import VerfiyOTP from '../pages/Auth/VerfiyOTP'
import UpdatePassword from '../pages/Auth/UpdatePassword'
import Unauthorized from './Unauthorized'
import CreatePermissions from '../pages/Dashboard/Roles/CreatePermissions'
import ViewPermission from '../pages/Dashboard/Roles/VIewPermission'
import Profile from '../pages/Dashboard/Profile/Profile'
import Activities from '../pages/Dashboard/UserActivities/Activities'
import ViewActivity from '../pages/Dashboard/UserActivities/ViewActivity'
import CreateNewRole from '../pages/Dashboard/Roles/CreateNewRole'
import ManageRoles from '../pages/Dashboard/Roles/ManageRoles'
import Permissions from '../pages/Dashboard/Roles/Permissions'
import SystemUsers from '../pages/Dashboard/Roles/SystemUsers'
import CreateUser from '../pages/Dashboard/Roles/CreateUser'
import BuyerDash from '../layouts/BuyerDash'
import MyDashboard from '../pages/BuyerDash/MyDashboard'
import ManageProduct from '../pages/Dashboard/Products/ManageProduct'
import AddProduct from '../pages/Dashboard/Products/AddProduct'
import ProductTypeList from '../pages/Dashboard/ProductTypes/ProductTypeList'
import CreateProductType from '../pages/Dashboard/ProductTypes/CreateProductType'

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/email-verify' element={<EmailVerify />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/TestForm' element={<TestForm />} />

                    <Route path='/forget-password' element={<ForgetPass />} />
                    <Route path='/verify-otp' element={<VerfiyOTP />} />
                    <Route path='/update-password' element={<UpdatePassword />} />
                    <Route path='/unauthorized' element={<Unauthorized />} />
                </Route>

                <Route path='/Dashboard/' element={<PrivateRoute roles={['admin', 'staff', 'vendor']}><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><DashError /></PrivateRoute>} />
                    <Route index element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><DashHome /></PrivateRoute>} />
                    <Route path='Chats' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><Chats /></PrivateRoute>} />
                    <Route path='Notifications' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><Notifications /></PrivateRoute>} />

                    <Route path='profile' element={<PrivateRoute roles={['buyer', 'admin', 'staff', 'vendor']}><Profile /> </PrivateRoute>} />


                    <Route path='manage-roles' element={<PrivateRoute roles={['admin']}><ManageRoles /></PrivateRoute>} />
                    <Route path='create-role' element={<PrivateRoute roles={['admin']}><CreateNewRole /></PrivateRoute>} />
                    <Route path='permissions' element={<PrivateRoute roles={['admin']}><Permissions /></PrivateRoute>} />
                    <Route path='system-users' element={<PrivateRoute roles={['admin']}><SystemUsers /></PrivateRoute>} />
                    <Route path='create-system-users' element={<PrivateRoute roles={['admin']}><CreateUser /></PrivateRoute>} />
                    <Route path='create-permissions' element={<PrivateRoute roles={['admin']}><CreatePermissions /></PrivateRoute>} />
                    <Route path='view-permissions/:id' element={<PrivateRoute roles={['admin']}><ViewPermission /></PrivateRoute>} />
                    <Route path='create-newrole' element={<PrivateRoute roles={['admin']}><CreateNewRole /></PrivateRoute>} />
                    <Route path='activities' element={<PrivateRoute roles={['admin']}><Activities /></PrivateRoute>} />
                    <Route path='view-activity/:id' element={<PrivateRoute roles={['admin']}><ViewActivity /></PrivateRoute>} />

                    <Route path='products' element={<PrivateRoute roles={['admin', 'staff']}><ManageProduct /></PrivateRoute>} />
                    <Route path='add-product' element={<PrivateRoute roles={['admin', 'staff']}><AddProduct /></PrivateRoute>} />
                    <Route path='product-types' element={<PrivateRoute roles={['admin', 'staff']}><ProductTypeList /></PrivateRoute>} />
                    <Route path='add-product-type' element={<PrivateRoute roles={['admin', 'staff']}><CreateProductType /></PrivateRoute>} />


                </Route>


                <Route path='/my-dashboard' element={<PrivateRoute roles={['buyer', 'admin']}><BuyerDash /> </PrivateRoute>} >
                    <Route index element={<PrivateRoute roles={['buyer', 'admin']}> <MyDashboard /> </PrivateRoute>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
