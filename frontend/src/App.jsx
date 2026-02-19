import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Navigate, replace, useNavigate } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom'

import AuthPage from './Pages/AuthPage';
import UserWorkers from './Pages/users/UserWorkers';
import ShopDashboard from './Pages/shops/ShopDashboard';
import ShopLayout from './Pages/shops/ShopLayout';
import ShopRentals from './Pages/shops/ShopRentals';
import ShopAddRental from './Pages/shops/ShopAddRental';
import ShopBookings from './Pages/shops/ShopBookings';
import ShopProfile from './Pages/shops/ShopProfile';
import AdminLayout from './Pages/admin/AdminLayout';
import AdminDashboard from './Pages/admin/AdminDashboard';
import AdminUsers from './Pages/admin/AdminUsers';
import AdminShops from './Pages/admin/AdminShops';
import AdminWorkers from './Pages/admin/AdminWorkers';
import AdminFeedbacks from './Pages/admin/AdminFeedbacks';
import AdminComplaints from './Pages/admin/AdminComplaints';
import UserLayout from './Pages/users/UserLayout';
import UserRentals from './Pages/users/UserRentals';
import UserBookings from './Pages/users/UserBookings';
import UserProfile from './Pages/users/UserProfile';
import UserDashboard from './Pages/users/UserDashboard';
import WorkerLayout from './Pages/workers/WorkerLayout';
import WorkerDashboard from './Pages/workers/WorkerDashboard';
import WorkerRequests from './Pages/workers/WorkerRequests';
import WorkerHistory from './Pages/workers/WorkerHistory';
import WorkerProfile from './Pages/workers/WorkerProfile';
import UserWorkerBookings from './Pages/users/UserWorkerBookings';
import ShopUpdateRentals from './Pages/shops/ShopUpdateRental';
import UserComplaintView from './Pages/users/UserComplaintView';


function App() {
 const navigate= useNavigate()
 const shoptoken= localStorage.getItem("shopid")
 const usertoken= localStorage.getItem("userid")
 const workertoken= localStorage.getItem("workerid")
 const admintoken = localStorage.getItem("adminid")

  return (
    <>
    <Routes>

      <Route path='/' element={<AuthPage/>}  />
      {/* USER Pages    */}
        <Route path="/user" element={usertoken ? <UserLayout /> : <AuthPage/>}>
          <Route index element={usertoken ? <UserDashboard /> : <AuthPage/>} />
          <Route path="dashboard" element={usertoken ? <UserDashboard />: <AuthPage/>} />
          <Route path="rentals"   element={usertoken ? <UserRentals />  : <AuthPage/>} />
          <Route path="workers"   element={usertoken ? <UserWorkers />  : <AuthPage/>} />
          <Route path="rental-bookings"  element={usertoken ? <UserBookings /> : <AuthPage/>} />
          <Route path="worker-bookings"  element={usertoken ? <UserWorkerBookings /> : <AuthPage/>} />
          <Route path="complaint-monitoring"  element={usertoken ? <UserComplaintView /> : <AuthPage/>} />
          <Route path="profile"   element={usertoken ? <UserProfile />  : <AuthPage/>} />
        </Route>

      {/* Worker Pages    */}
        <Route path="/worker"     element={workertoken ? <WorkerLayout />   : <AuthPage/>}>
          <Route index            element={workertoken ? <WorkerDashboard />: <AuthPage/>} />
          <Route path="dashboard" element={workertoken ? <WorkerDashboard />: <AuthPage/>} />
          <Route path="requests"  element={workertoken ? <WorkerRequests /> : <AuthPage/>} />
          <Route path="history"   element={workertoken ? <WorkerHistory />  : <AuthPage/>} />
          <Route path="profile"   element={workertoken ? <WorkerProfile />  : <AuthPage/>} />
        </Route>

      {/* SHOP Pages    */}
        <Route path="/shop" element={shoptoken ? <ShopLayout /> : <AuthPage/>  }>
          <Route index element={shoptoken? <Navigate to="dashboard" replace /> : <AuthPage/>} />
          <Route path="dashboard" element={shoptoken ? <ShopDashboard /> : <AuthPage/> } />
          <Route path="rentals" element={shoptoken ? <ShopRentals /> : <AuthPage/>}  />
          <Route path="add-rental" element={shoptoken ? <ShopAddRental /> : <AuthPage/> } />
          <Route path="update-rental/:id" element={shoptoken ? <ShopUpdateRentals /> : <AuthPage/> } />
          <Route path="bookings" element={shoptoken ? <ShopBookings /> : <AuthPage/>} />
          <Route path="profile" element={shoptoken ? <ShopProfile /> : <AuthPage/> } />
        </Route>

      {/* ADMIN Pages    */}
        <Route path="/admin" element={admintoken ? <AdminLayout /> : <AuthPage/>}>
          <Route index element={admintoken ? <AdminDashboard /> : <AuthPage/>} />
          <Route path="dashboard" element={admintoken ?<AdminDashboard /> : <AuthPage/>} />
          <Route path="users"     element={admintoken ?<AdminUsers />     : <AuthPage/>} />
          <Route path="shops"     element={admintoken ?<AdminShops />     : <AuthPage/>} />
          <Route path="workers"   element={admintoken ?<AdminWorkers />   : <AuthPage/>} />
          <Route path="feedbacks" element={admintoken ?<AdminFeedbacks /> : <AuthPage/>} />
         <Route path="complaints" element={admintoken ?<AdminComplaints />: <AuthPage/>} />
        </Route>

    </Routes>
      
    </>
  )
}

export default App
