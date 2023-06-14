import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Aside from './Aside'
import Footer from '../Footer'
import Main from './Main'
import Navbar from './Navbar'
import CreateOrder from './CreateOrder'
import ViewOrder from './ViewOrder'
import Setting from './Setting'
import ViewPayment from './ViewPayment'
export default function Home() {
    return (
        <>
            <Aside></Aside>
            <Navbar></Navbar>
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0">Customer Portal</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                <section className="content">
                   <Main></Main>
                   <Routes>
                        
                        <Route path={'/createOrder'} element={<CreateOrder></CreateOrder>}></Route>
                        <Route path={'/viewOrders'} element={<ViewOrder></ViewOrder>}></Route>
                        <Route path={'/viewInvoice'} element={<ViewPayment></ViewPayment>}></Route>
                        <Route path={'/settings'} element={<Setting></Setting>}></Route>
                       
                   </Routes>
                </section>
                {/* /.content */}
            </div>

            <Footer></Footer>
        </>
    )
}
