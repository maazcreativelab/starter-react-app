import React from 'react'
import Footer from '../Footer'
import AdminNav from './AdminNav'
import AdminAside from './AdminAside'
import { Outlet } from 'react-router-dom'

export default function AdminDashLayout() {
  return (
    
    <>
    <AdminAside></AdminAside>
    <AdminNav></AdminNav>
    <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0">Admin Portal</h1>
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
           <Outlet></Outlet>
           
        </section>
        {/* /.content */}
    </div>

    <Footer></Footer>
    </>
  
  )
}
