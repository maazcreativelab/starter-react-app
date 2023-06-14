import React from 'react'

export default function Main() {
    return (
        <div className="container-fluid" style={{height:"80vh"}}>
            {/* Small boxes (Stat box) */}
            <div className="row">
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>150</h3>
                            <p>Pending Orders</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                            <p>Pending Qoutes</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>44</h3>
                            <p>Digitizing Orders</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>65</h3>
                            <p>Digitizing Qoutes</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
            </div>
            <div className="row">
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-info">
                        <div className="inner">
                            <h3>150</h3>
                            <p>Vector Orders</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-bag" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-success">
                        <div className="inner">
                            <h3>53<sup style={{ fontSize: 20 }}>%</sup></h3>
                            <p>Vector Qoutes</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-stats-bars" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-warning">
                        <div className="inner">
                            <h3>44</h3>
                            <p>Paid Invoices</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-person-add" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
                <div className="col-lg-3 col-6">
                    {/* small box */}
                    <div className="small-box bg-danger">
                        <div className="inner">
                            <h3>$150</h3>
                            <p>Unpaid Amount</p>
                        </div>
                        <div className="icon">
                            <i className="ion ion-pie-graph" />
                        </div>
                        <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                    </div>
                </div>
                {/* ./col */}
            </div>
            
        </div>
    )
}
