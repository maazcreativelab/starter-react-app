import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Dropzone from 'react-dropzone';

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

export default function AssignOrder() {
  const { id } = useParams();
  const location = useLocation();
  let navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [selected, setSelected] = useState([]);
  const [design_name, setdesign_name] = useState(null);
  const [order_type, setorder_type] = useState(null);
  const [design_placement, setdesign_placement] = useState(null);
  const [allfiles, setallfiles] = useState([]);
  const [rejectedFiles, setRejectedFiles] = useState([]);
  const [files, setfiles] = useState([]);
  const [color_preference, setcolor_preference] = useState(null);
  const [garment_material, setgarment_material] = useState(null);
  const [dimension, setdimension] = useState(null);
  const [instruction, setinstruction] = useState(null);
  const [email_send_copy, setemail_send_copy] = useState(null);
  const [order_priority, setorder_priority] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [order, setorder] = useState(null);
  const [order_id, setorder_id] = useState(null);
  const [digitizers, setdigitizers] = useState(null);
  const [error, seterror] = useState(null);
  const [ispending, setispending] = useState(true);
  const [digitizer_id, setdigitizer_id] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    console.log(controller.signal);
    const getOrders = async () => {
      console.log('inside getorders function');
      try {
        const response = await axiosPrivate.get(`/api/admin/order/${id}`, {
          signal: controller.signal,
        });

        isMounted && setorder(response.data);
        console.log(response.data);
        setorder_type(response.data.order_type);
        setdesign_name(response.data.design_name);
        setdesign_placement(
          JSON.parse(response.data.design_placement).map((item) => ({
            label: item,
            value: item,
          })),
        );
        setcolor_preference(response.data.color_preference);
        setgarment_material(response.data.garment_material);
        setdimension(response.data.dimension);
        setinstruction(response.data.instruction);
        setorder_id(response.data.id);
        setfiles(response.data.orderFiles);
        setorder_priority(response.data.order_priority)
        console.log(response.data.orderFiles);
      } catch (err) {
        seterror(err);
        setispending(false);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    const getDigitizers = async () => {
      try {
        const response = await axiosPrivate.get('/api/admin/digitizer', {
          signal: controller.signal,
        });
        console.log('data', response);

        isMounted && setdigitizers(response.data);
      } catch (err) {
        console.log(err);
        seterror(err);
        setispending(false);
        // navigate('/login', { state: { from: location }, replace: true });
      }
    };

    getDigitizers();

    getOrders();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(design_name);
    console.log('color-preference', color_preference);
    const formData = new FormData();
    let isMounted = true;
    const controller = new AbortController();

    const postAssignOrder = async () => {
      let isMounted = true;
      const controller = new AbortController();

      try {
        const response = await axiosPrivate.post(
          '/api/admin/assign',
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            signal: controller.signal,
          },
        );
        console.log(response.data);
        // isMounted && setUsers(response.data);
        isMounted && navigate('/admin/orders/');
      } catch (err) {
        console.error(err);
        navigate('/login', { state: { from: location }, replace: true });
      }
    };
    console.log('selected', typeof selected);
    const arrayDesign = design_placement.map((item) => item?.value);
    const stringDesign = JSON.stringify(arrayDesign);
    formData.append('order_priority', order_priority);
    formData.append('design_name', design_name);
    formData.append('design_placement', stringDesign);
    formData.append('color_preference', color_preference);
    formData.append('garment_material', garment_material);
    formData.append('dimension', dimension);
    formData.append('instruction', instruction);
    formData.append('order_id', order_id);
    formData.append('digitizer_id', digitizer_id);
    formData.append('customerFiles', JSON.stringify(files));

    selectedFiles.length > 0
      ? selectedFiles.forEach((item) => formData.append('files', item))
      : setSelectedFiles('');
    // formData.append('digitizer_user_id', digitizer_user_id);
    console.log('files=>', files);
    console.log('selcted files=>', selectedFiles);
    postAssignOrder();
    return () => {
      isMounted = false;
      controller.abort();
    };
  };

  const handleDrop = (acceptedFiles) => {
    // Calculate the total size of all selected files
    const totalSize =
      selectedFiles.reduce((acc, file) => acc + file.size, 0) +
      acceptedFiles.reduce((acc, file) => acc + file.size, 0);

    // Check if the total size exceeds 100 megabytes
    if (totalSize > 100 * 1024 * 1024) {
      console.log('Total file size exceeds 100 MB');
      return;
    }

    setSelectedFiles([...selectedFiles, ...acceptedFiles]);
  };

  const handleRemove = (index) => {
    let filterfiles = files.filter((item, itemindex) => itemindex !== index);

    setfiles(filterfiles);
  };

  return (
    <div className="container">
      <div className="row my-4">
        <div className="card card-success">
          <div className="card-header">
            <h3 className="card-title">
              Assign Order for Digitizing or Vectorizing
            </h3>
          </div>
          <div className="card-body">
            {order && (
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className="form-group">
                  <label for="">Digitizers/Vectorizers</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      setdigitizer_id(e.target.value);
                    }}
                  >
                    <option>Select Digitizer</option>
                    {digitizers &&
                      digitizers.map((digitizer) => (
                        <option value={digitizer.id}>
                          {digitizer.username}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label for="">Order Priority</label>
                  <select
                    className="form-control"
                  
                    onChange={(e) => {
                      setorder_priority(e.target.value);
                    }}
                  >
                    {order_priority=="Normal"?<option value="Normal" selected>
                      Normal - No Rush, Need Anytime Today or Tomorrow
                    </option>:<option value="Normal" >
                      Normal - No Rush, Need Anytime Today or Tomorrow
                    </option>}
                    {order_priority=="Normal"?<option value="URGENT" selected >
                      URGENT - Need By Tomorrow Morning!
                    </option>:<option value="URGENT" >
                      URGENT - Need By Tomorrow Morning!
                    </option>}
                    {order_priority=="Normal"?<option value="SUPER URGENT" selected>
                      SUPER URGENT - Need Today!
                    </option>:<option value="SUPER URGENT">
                      SUPER URGENT - Need Today!
                    </option>}
                  </select>
                </div>
                <div className="form-group">
                  <label for="">Design Name P.O Number</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Design Name P.O Number"
                    onChange={(e) => {
                      setdesign_name(e.target.value);
                    }}
                    defaultValue={design_name}
                  />
                </div>
                <div className="form-group">
                  <label for="">Order Type</label>
                  <select
                    class="form-control"
                    onChange={(e) => {
                      setorder_type(e.target.value);
                    }}
                  >
                    <option>Embroidery Digitizing Order</option>
                    <option>Embroidery Digitizing Quote</option>
                    <option>Vector Art Order</option>
                    <option>Vector Art Quote</option>
                    <option>
                      Both Embroidery Digitizing & Vector Art Orders
                    </option>
                    <option>
                      Both Embroidery Digitizing & Vector Art Qoutes
                    </option>
                  </select>
                </div>

                <div>
                  <label for="exampleInputEmail1">Placement of Design</label>

                  <MultiSelect
                    options={options}
                    value={design_placement}
                    onChange={setdesign_placement}
                    labelledBy="Select"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Color Preference</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Color Preference"
                    onChange={(e) => {
                      setcolor_preference(e.target.value);
                    }}
                    defaultValue={color_preference}
                  />
                </div>

                <div className="form-group">
                  <label for="">Garment Material</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Garment Material"
                    onChange={(e) => {
                      setgarment_material(e.target.value);
                    }}
                    defaultValue={garment_material}
                  />
                </div>
                <div className="form-group">
                  <label for="">Dimension(width x height)</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter Dimension(width x height)"
                    onChange={(e) => {
                      setdimension(e.target.value);
                    }}
                    defaultValue={dimension}
                  />
                </div>
                <div className="text-center form-group">
                  <h3 className="my-2">
                    Instructions or Any Additional Notes:
                  </h3>
                  <small>
                    Instructions are not required but help in improving quality.
                    For example if you want to run this design on any special
                    fabric like fleeces or black color garments please write
                    here to get expected / best results in the first attempt.
                  </small>
                  <textarea
                    class="form-control"
                    rows="3"
                    placeholder="Enter Additional Notes"
                    onChange={(e) => {
                      setinstruction(e.target.value);
                    }}
                    defaultValue={instruction}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label className="form-label">Select More files</label>
                  <div class="bg-danger p-2 rounded rounded-3">
                    Warning! Upload multiple files but size not exceed more than
                    100 MB
                  </div>

                  <Dropzone
                    onDrop={handleDrop}
                    multiple
                    maxSize={100 * 1024 * 1024}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p className="btn btn-primary my-2 w-100">
                          Drag and drop files here, or click to select files
                        </p>
                        {selectedFiles.length > 0 && (
                          <div>
                            <h4>Selected Files:</h4>

                            <ul className="list-unstyled">
                              {selectedFiles.map((file) => (
                                <li className="list-group-item" key={file.name}>
                                  {file.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </Dropzone>
                  <label className="form-label">Customer files</label>
                  <ul className="list-unstyled">
                    {files.map((file, index) => (
                      <li className="list-group-item" key={file.filename}>
                        {file.filename}
                        <a href={file.path} target="_blank">
                          View
                        </a>
                        <button
                          className="btn btn-danger float-right"
                          onClick={() => {
                            handleRemove(index);
                          }}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="text-center">
                  <input
                    type="submit"
                    className="btn btn-success my-3 w-50"
                    value={'Assign Order'}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
