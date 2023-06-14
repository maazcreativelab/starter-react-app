import React, { useEffect, useState } from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { TagFilled  ,EditFilled} from '@ant-design/icons';

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
    const getAllOrders = async () => {
      console.log("inside getorders function")
      try {
        // console.log("inside getorders try")

        const response = await axiosPrivate.get('/api/admin/order', {
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

    getAllOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  const openFileInNewTab = (base64Data) => {
    const fileType = getFileType(base64Data);
    const blob = b64toBlob(base64Data);
    const url = URL.createObjectURL(blob);
    window.open(url);
  };

  const getFileType = (base64Data) => {
    const data = atob(base64Data);
    const bytes = new Uint8Array(data.length);

    for (let i = 0; i < data.length; i++) {
      bytes[i] = data.charCodeAt(i);
    }

    let fileType = '';
    const uint = bytes.subarray(0, 4);
    const header = [...uint].map((byte) => byte.toString(16)).join('').toUpperCase();

    switch (header) {
      case '89504E47':
        fileType = 'image/png';
        break;
      case 'FFD8FFDB':
      case 'FFD8FFE0':
      case 'FFD8FFE1':
        fileType = 'image/jpeg';
        break;
      case '25504446':
        fileType = 'application/pdf';
        break;
      default:
        fileType = 'application/octet-stream';
        break;
    }

    return fileType;
  };

  const b64toBlob = (base64Data) => {
    const byteCharacters = atob(base64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays);
    return blob;
  };

  
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
              <th>Actions</th>
        
               {/*<th>Design Placement</th>
              <th>Files</th>
              <th>Color Preference</th>
              <th>Garment Material</th>
              <th>Dimension</th>
              <th>Instruction</th>
              <th>Order Priority</th>
             <th>Email to Send Copy</th>*/}
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
                  
                  {/*<td><Link to={`/admin/orders/assign/${order.id}`}><ManOutlined /></Link></td>
                    <td><Link to={`/admin/orders/edit/${order.id}`}><ManOutlined /></Link></td>*/}

                  <div className="icon-container" >
                  <td><Link to={`/admin/orders/edit/${order.id}`}><EditFilled style={{ fontSize: '25px', color: '#023047' }} /></Link></td>
                  <span className="text">Edit Order</span>
                  </div>
                  <div className="icon-container" >
                  <td><Link to={`/admin/orders/assign/${order.id}`}><TagFilled style={{ fontSize: '25px', color: '#9b2226' }} /> </Link></td>
                  <span className="text">Assign Order</span>
                  </div>

                   {/*<td>{order?.design_placement.replace(/[\[\]"]/g, '')}</td>
                  <td> 
                  {
                    order?.orderFiles.map((file,index)=>(<><a href={file.path} target="_blank" rel="noopener noreferrer">view{index+1}</a> <br /></> ))
                  }

                  </td>
                 <td>{order?.color_preference}</td>
                  <td>{order?.garment_material}</td>
                  <td>{order?.dimension}</td>
                  <td>{order?.instruction}</td>
                  <td>{order?.order_priority}</td>
                   <td>{order?.email_send_copy}</td>*/}
                 
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
