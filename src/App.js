import './App.css';
import Home from './components/customer/Home';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import CustomerDashLayout from './components/customer/CustomerDashLayout'
import Main from './components/customer/Main';
import ViewOrder from './components/customer/ViewOrder';
import CreateOrder from './components/customer/CreateOrder';
import Setting from './components/customer/Setting';
import AdminDashLayout from './components/admin/AdminDashLayout';
import RequireAuth from './components/RequireAuth';
import AdminViewPendingOrder from './components/admin/AdminViewPendingOrder';
import AdminCreateOrder from './components/admin/AdminCreateOrder';
import AdminViewOrder from './components/admin/AdminViewOrder';
import AddDigitizer from './components/admin/AddDigitizer';
import ViewDigitizers from './components/admin/ViewDigitizers';
import AssignOrder from './components/admin/AssignOrder';
import ViewCustomers from './components/admin/ViewCustomers';
import EditOrder from './components/admin/EditOrder';
import EditDigitizer from './components/admin/EditDigitizer';
import AddCustomer from './components/admin/AddCustomer';


export const ROLES = {
  'Customer': 2001,
  'Admin': 1984
}

function App() {
  return (
    <Routes>
      <Route path={'login'} element={<Login></Login>}></Route>
      <Route path={'register'} element={<Register></Register>}></Route>
      <Route element={<RequireAuth allowedRoles={ROLES.Customer}></RequireAuth>}>
        <Route path="customer" element={<CustomerDashLayout />}>
          <Route index element={<Main></Main>}></Route>
          <Route path='settings' element={<Setting></Setting>}></Route>
          <Route path="orders">
            <Route index element={<ViewOrder />} />
            {/*<Route path=":id" element={<EditUser />} />*/}
            <Route path="new" element={<CreateOrder />} />
          </Route>
        </Route>
      </Route>
       <Route element={<RequireAuth allowedRoles={ROLES.Admin}></RequireAuth>}> 
        <Route path="admin" element={<AdminDashLayout />}>
          <Route index element={<Main></Main>}></Route>
          <Route path='settings' element={<Setting></Setting>}></Route>
          <Route path='addDigitizer' element={<AddDigitizer></AddDigitizer>}></Route>
          <Route path='viewDigitizer' element={<ViewDigitizers></ViewDigitizers>}></Route>
          <Route path='editDigitizer/:id' element={<EditDigitizer></EditDigitizer>}></Route>
          <Route path='viewCustomer' element={<ViewCustomers/>}></Route>
          <Route path='addCustomer' element={<AddCustomer/>}></Route>
          <Route path="orders">
            <Route index element={<AdminViewOrder></AdminViewOrder>} />
            {/*<Route path=":id" element={<EditUser />} />*/}
            <Route path="pending" element={<AdminViewPendingOrder />} />
            <Route path="new" element={<AdminCreateOrder />} />
            <Route path="assign/:id" element={<AssignOrder />} />
            <Route path="edit/:id" element={<EditOrder />} />
          </Route>
        </Route>
      </Route> 
    </Routes>
  );
}

export default App;
