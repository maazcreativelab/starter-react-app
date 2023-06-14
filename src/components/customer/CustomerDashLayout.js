import React from 'react'
import { Outlet } from 'react-router-dom'
import Aside from './Aside'
import Navbar from './Navbar'
import Footer from '../Footer'

export default function CustomerDashLayout() {
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
        <section className="content" style={{minHeight:'100vh'}}>
           <Outlet></Outlet>
           
        </section>
        {/* /.content */}
    </div>

    <Footer></Footer>
    </>
  )
}
