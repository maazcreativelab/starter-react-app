import React, {useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Dropzone from 'react-dropzone';
import FormInput from '../Utils/FormInput';
import Swal from "sweetalert2"
const options = [
  { label: 'Hat / Cap Front ', value: 'Hat / Cap Front' },
  { label: 'Hat / Cap Back ', value: 'Hat / Cap Back' },
  { label: 'Hat / Cap Side ', value: 'Hat / Cap Side' },
  { label: 'Visor / Vizor ', value: 'Visor / Vizor' },
  { label: 'Beanie ', value: 'Beanie' },
  { label: ' Left Chest', value: 'Left Chest' },
  { label: ' Left Breast', value: 'Left Breast' },
  { label: ' Sleeve', value: 'Sleeve' },
  { label: ' Full Back', value: 'Full Back' },
  { label: ' Apron', value: 'Apron' },
  { label: 'Towel', value: 'Towel' },
  { label: 'Blanket', value: 'Blanket' },
  { label: 'Other', value: 'Other' },
];
export default function CreateOrder() {
  const location = useLocation();
  let navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();


  const [preference, setpreference] = useState(false);
  const [selected, setSelected] = useState([]);
  const [order_type, setorder_type] = useState("Embroidery Digitizing Order");
  const [color_preference, setcolor_preference] = useState("Select the colors like you normally do");
  const [instruction, setinstruction] = useState('N/A');
  const [email_send_copy, setemail_send_copy] = useState(null);
  const [order_priority, setorder_priority] = useState('Normal');
  const [values, setValues] = useState({});
  
  const inputs = [
    {
      id: 1,
      name: 'design_name',
      type: 'text',
      placeholder: 'Enter Design Name P.O Number',
      errorMessage:
        "design_name should be 3-50 characters and shouldn't include any special character!",
      label: 'Design Name P.O Number',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 2,
      name: 'garment_material',
      type: 'text',
      placeholder: 'Enter Garment Material',
      errorMessage:
        "Garment Material should be 3-50 characters and shouldn't include any special character!",
      label: 'Garment Material',
      pattern: '^[A-Za-z0-9 ]{3,50}$',
      required: false,
    },
    {
      id: 3,
      name: 'dimension',
      type: 'text',
      placeholder: 'Enter Dimension(width x height)',
      errorMessage:
        "Dimension should be 1-50 characters",
      label: 'Dimension(width x height)',
      // pattern: /^[\w !@#$%^&*()_+\-=[\]{};':"|,.<>/?]{1,50}$/,
      required: true,
    },
  ];
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    // Calculate the total size of all selected files
    const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0) + acceptedFiles.reduce((acc, file) => acc + file.size, 0);

    // Check if the total size exceeds 100 megabytes
    if (totalSize > 100 * 1024 * 1024) {
      console.log('Total file size exceeds 100 MB');
      return;
    }

    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };
 


  
  let handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    let isMounted = true;
    const controller = new AbortController();
    
    const postOrder = async () => {
      let isMounted = true;
      const controller = new AbortController();
      
      try {
        const response = await axiosPrivate.post(
          '/api/customer/order',
          formData,{
            headers: { "Content-Type": "multipart/form-data" },
            signal: controller.signal,
          },
        );
        console.log(response.data);
        // isMounted && setUsers(response.data);
        isMounted && navigate('/customer/orders/');
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    // post request end
    const arrayDesign = selected.map((item) => item?.value);
    const stringDesign = JSON.stringify(arrayDesign);
    
    const {design_name,garment_material,dimension}=values
   
    formData.append('design_name', design_name);
    formData.append('order_type', order_type);
    formData.append('design_placement', stringDesign);
    formData.append('color_preference', color_preference);
    formData.append('garment_material', garment_material);
    formData.append('dimension', dimension);
    formData.append('instruction', instruction);
    formData.append('email_send_copy', email_send_copy);
    formData.append('order_priority', order_priority);

    console.log(selectedFiles)

    selectedFiles.length > 0 
    ? 
    selectedFiles.forEach((item) => formData.append('files', item))
    :
    setSelectedFiles('')


    // console.log("files",selectedFiles)
   
    if (selected.length <= 0){
      Swal.fire({
        title: 'Error!',
        text: 'please select design placement',
        icon: 'error',
        confirmButtonText: 'Cool'
      })
    }
    if(selected.length > 0 ){
      console.log("form data",formData)
      postOrder();
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  };
 
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="container">
      <div className="row my-4">
        <div className="card card-success">
          <div className="card-header">
            <h3 className="card-title">
              Place New Order or Quote for Embroidery Digitizing or Vectorizing
            </h3>
          </div>
          <div className="card-body w-100">
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              {inputs.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              ))}
              <div className="form-group">
              <label for="">Order Type</label>
              <select
                class="form-control"
                onChange={(e) => {
                  setorder_type(e.target.value);
                }}
              >
                <option value="Embroidery Digitizing Order">Embroidery Digitizing Order</option>
                <option value="Embroidery Digitizing Quote">Embroidery Digitizing Quote</option>
                <option value="Vector Art Order">Vector Art Order</option>
                <option value="Vector Art Quote">Vector Art Quote</option>
                <option value="Both Embroidery Digitizing & Vector Art Orders">
                  Both Embroidery Digitizing & Vector Art Orders
                </option>
                <option value="Both Embroidery Digitizing & Vector Art Qoutes">
                  Both Embroidery Digitizing & Vector Art Qoutes
                </option>
              </select>
            </div>
            <div>
              <label for="exampleInputEmail1">Placement of Design</label>

              <MultiSelect
                options={options}
                value={selected}
                onChange={setSelected}
                labelledBy="Select"
              />
            </div>
            {/*<input type="file" multiple onChange={handleFileChange} />*/}
            <div className="form-group">
            
            <label className="form-label">Select files</label>
            <div class="bg-danger p-2 rounded rounded-3">
              Warning! Upload multiple files but size not exceed more than 100 MB
            </div>
            <Dropzone onDrop={handleDrop} multiple maxSize={100 * 1024 * 1024}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p className='btn btn-primary my-2 w-100'>Drag and drop files here, or click to select files</p>
                {selectedFiles.length > 0 && (
                  <div>
                    <h4>Selected Files:</h4>
                    
                    <ul className='list-unstyled'>
                      {selectedFiles.map((file) => (
                        <li className='list-group-item' key={file.name}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </Dropzone>


         



            </div>   
            
            <div className="form-group">
            <label className="form-label">Color Preference</label>

              {preference ? (
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Color Preference"
                  onChange={(e) => {
                    setcolor_preference(e.target.value);
                  }}
                />
              ) : (
                <select
                  class="form-control"
                 
                  onChange={(e) => {
                    setcolor_preference(e.target.value);
                  }}
                >
                  <option value="Select the colors like you normally do">
                    Select the colors like you normally do
                  </option>
                  <option value="Match colors to artwork as much you can">
                    Match colors to artwork as much you can
                  </option>
                  <option value="Make this a single color design">Make this a single color design</option>
                </select>
              )}
              <div className="custom-control custom-checkbox my-2">
                <input
                  className="custom-control-input custom-control-input-danger"
                  type="checkbox"
                  id="customCheckbox4"
                  onChange={(e) => {
                    e.target.checked
                      ? setpreference(true)
                      : setpreference(false);
                  }}
                />
                <label
                  htmlFor="customCheckbox4"
                  className="custom-control-label"
                >
                  I want to mention different colors
                </label>
              </div>
            </div>
            <div className="text-center form-group">
            <h3 className="my-2">Instructions or Any Additional Notes:</h3>
            <small>
              Instructions are not required but help in improving quality.
              For example if you want to run this design on any special
              fabric like fleeces or black color garments please write here
              to get expected / best results in the first attempt.
            </small>
            <textarea
              class="form-control"
              rows="3"
              placeholder="Enter Additional Notes"
              onChange={(e) => {
                setinstruction(e.target.value);
              }}
            ></textarea>
          </div>
          <div className="form-group">
            <label for="">Order Priority</label>
            <select
              className="form-control"

              onChange={(e) => {
                setorder_priority(e.target.value);
              }}
            >
              <option value="Normal">
                Normal - No Rush, Need Anytime Today or Tomorrow
              </option>
              <option value="URGENT">
                URGENT - Need By Tomorrow Morning!
              </option>
              <option value="SUPER URGENT">
                SUPER URGENT - Need Today!
              </option>
            </select>
          </div>
          <div className="text-center">
            <input
              type="submit"
              className="btn btn-success my-3 w-50"
              value={"Place Order"}
            />
          </div>




            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
