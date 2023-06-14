import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
export default function ViewOrder() {

  const { auth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [orders, setorders] = useState(null);
  const [error, seterror] = useState(null);
  const [ispending, setispending] = useState(true);
  useEffect(() => {
    console.log('useeffect');
    let isMounted = true;
    const controller = new AbortController();
    console.log(controller.signal);
    const getOrders = async () => {
      console.log("inside getorders function")
      try {
        // console.log("inside getorders try")

        const response = await axiosPrivate.get('/api/customer/order', {
          signal: controller.signal,
        });
        console.log("data",response);
       
        isMounted && setorders(response.data);
      } catch (err) {
        seterror(err);
        setispending(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);


 

  
  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">View Order</h3>
        {error && <h3 className="card-title">{error}</h3>}
        <div className="card-tools">
          <div className="input-group input-group-sm" style={{ width: 150 }}>
            <input
              type="text"
              name="table_search"
              className="form-control float-right"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button type="submit" className="btn btn-default">
                <i className="fas fa-search" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="card-body table-responsive p-0"
        style={{ height: '80vh' }}
      >
        <table className="table table-head-fixed text-wrap">
          <thead>
            <tr>
              <th>Design name</th>
              <th>Order Type</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>Price</th>
        
              <th>Design Placement</th>
              <th>Files</th>
              <th>Color Preference</th>
              <th>Garment Material</th>
              <th>Dimension</th>
              <th>Instruction</th>
              <th>Order Priority</th>
              {/*<th>Email to Send Copy</th>*/}
            </tr>
          </thead>
          <tbody>
            {orders &&
              orders.map((order) => (
                <tr>
                  <td>{order?.design_name}</td>
                  <td>{order.order_type}</td>
                  <td>
                    {order?.order_status == 'pending' ? (
                      <span class="badge bg-danger">{order?.order_status}</span>
                    ) : (
                      <span class="badge bg-success">
                        {order?.order_status}
                      </span>
                    )}
                  </td>
                  <td>{order?.payment_status}</td>
                  <td>{order?.price}</td>
               
                  <td>{order?.design_placement.replace(/[\[\]"]/g, '')}</td>
                  <td> 
                  {
                    order?.orderFiles.map((file,index)=>(<><a href={file.path} target="_blank" rel="noopener noreferrer">view{index+1}</a> <br /></> ))
                  }
                 {/* <a
                href="#"
                onClick={() => openFileInNewTab(order.files)}
                >
                Open File
                </a>*/}
                  </td>
                  <td>{order?.color_preference}</td>
                  <td>{order?.garment_material}</td>
                  <td>{order?.dimension}</td>
                  <td>{order?.instruction}</td>
                  <td>{order?.order_priority}</td>
                  {/* <td>{order?.email_send_copy}</td>*/}
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
