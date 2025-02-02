import { React, useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table, Popconfirm, message, Select, Checkbox } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";
const PatientDetails = () => {
  // const data=JSON.parse(window.localStorage.getItem('patientDetails'))
  // console.log(data);
  //get the params passed on to fetch data via id using uselocation
  //Update:  from where request is generated dr, hospital ,guardian , by location
  //data usestate, async function useEffect call --page api call to get data using id
  const location = useLocation();
  const id = location.state.id;
  const redirectFrom = location.state.redirectFrom;

  // console.log(id, redirectFrom);
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [tests, setTests] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const [showMedicineModal, setShowMedicineModal] = useState(false)
  const [showLogs, setShowLogs] = useState("temperature")
  const [showScheduleTestModal, setShowScheduleTestModal] = useState(false)
  const [showTest, setShowTest] = useState(false)

  let tempLogs = []
  let spO2Logs = []
  let hrLogs = []

  if(logs){
    for(let i=0;i<logs.length;i++)
    {
      if(logs[i].type==0)
      {
        tempLogs.push(logs[i])
      }
      else if(logs[i].type == 1){
        spO2Logs.push(logs[i]);
      }
      else{
        hrLogs.push(logs[i])
      }
    }
  }
  
  const getPatDetails = async () => {
    const resp = await axios.post(
      "http://192.168.38.220:8000/api/v1/patient/patdetails",
      { id }
    );
    setData(resp.data.data);
    // console.log(resp.data.logs)
    setLogs(resp.data.logs);
    setPrescriptions(resp.data.prescriptions)
    setTests(resp.data.tests)
  };

  const sendEmail = async (subject,text) => {
    const resp = await axios.post(
      "http://192.168.38.220:8000/api/v1/patient/sendEmail",
      {
        "email":data.email,
        "subject":subject,
        "text":text
      }
    );

    alert("Message sent");
  };
  useEffect(() => {
    // const func= async()=>{
    //   await getPatDetails();
    //   console.log(logs)
    // }
    // // console.log(logs)
    // func()
    getPatDetails()
     
  }, []);

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title : "Value",
      // dataIndex: "value"
      render:(text,record)=>
      (record.value >= 102 ? 
        <p className="fw-bold text-danger">
          {record.value}
        </p>:
        <p>
          {record.value}
        </p>
      )
    }
  ];

  const handleMedicineRemove = async(record) => {
    try {
      const res = await axios.post(
        "http://192.168.38.220:8000/api/v1/prescribe/delete",
        {
          prescriptionId: record._id
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getPatDetails();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      alert(error)
    }
  }

  const prescriotionColumns = [
    {
      title: "Cause",
      dataIndex: "diseaseName"
    },
    {
      title: "Medicine",
      dataIndex: "medicine"
    },
    {
      title: "Duration",
      dataIndex : "weeks"
    },
    {
      title: "Stop",
      render : (text, record) =>
        <div className="button-container">
          <Popconfirm
            title="Remove the medicine"
            description="Are you sure to remove this medicine?"
            onConfirm={() => handleMedicineRemove(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </div>
    }
  ];
  // console.log(data)
  // console.log(logs)
  // if(tempLogs && redirectFrom === "guardian")
  // {
  //   // console.log(tempLogs)
  //   for(let i=0;i<tempLogs.length;i++)
  //    {
  //     if(tempLogs[i].value>=102 && tempLogs[i].type==0)
  //       {
  //         let text="Temperature is recorded higher than usual reading. Immediate medication is required.Kindly arrange for tests if required "
  //         let subject="Body Temperature high Alert- geriatic care"
  //         sendEmail(subject,text)
  //       }
  //    }
  // }

  const downloadReport = () => {
    var json = JSON.stringify(logs);
    json = [json];
    var blob1 = new Blob(json, { type: "text/plain;charset=utf-8" });
    var isIE = false || !!document.documentMode;
    if (isIE) {
        window.navigator.msSaveBlob(blob1, "report.txt");
    } else {
        var url = window.URL || window.webkitURL;
        const link = url.createObjectURL(blob1);
        var a = document.createElement("a");
        a.download = "report.txt";
        a.href = link;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
  }

  const [form] = Form.useForm();

  // console.log(data)
  const submitPrescriptionHandler = async(val) => {
    console.log(val)
    const resp=await axios.post(
      "http://192.168.38.220:8000/api/v1/prescribe/add",
      {
        ...val,
        patientEmail:data.email
      }
    )
    if(resp.data.success)
    {
      alert(resp.data.message)
      form.resetFields();
      getPatDetails();
    }
    else
    alert(resp.data.message)
  }

  const setLogsChange = (val) => {
    // console.log(val)
    setShowLogs(val);
  }

  const submitScheduleTestHandler = async(val) => {
    const resp = await axios.post(
      "http://192.168.38.220:8000/api/v1/schedule/update", 
      {
        ...val,
        patientEmail:data.email
      }
    )
    if(resp.data.success)
    {
      // alert(resp.data.message)
      message.success(resp.data.message)
    }
    else
    message.error(resp.data.message)
  }

  return (
    <>
      {/* <h1>Hi guardian ={data.guardianName} patient={data.pName} is under doctor name={data.doctorEmail}</h1>
    <button onClick={sendEmail} className="btn btn-primary">Send Email</button> */}
      <div className="p-5">
        {/* <h2>Welcome {data && data.guardianName}</h2> */}
       <div className="welcomeBox">
          <p>Hello {redirectFrom === 'guardian' && data ? data.guardianName : redirectFrom} </p>
       </div>
       <div className="w-50 mx-auto">
       <Select
        defaultValue="temperature"
        style={{ width: 120 }}
        onChange={setLogsChange}
        options={[
          { value: 'temperature', label: 'Temperature' },
          { value: 'spo2', label: 'SPO2' },
          { value: 'heart-rate', label: 'Heart Rate' }
        ]}
      />
       </div>
        <div className="w-50 mx-auto">
          <Modal
            forceRender
            title = "Add Prescription"
            open = {showModal}
            onCancel={() => {
              setShowModal(false)
            }} 
            footer = {false}
          >
            <Form 
              layout="vertical" 
              onFinish={submitPrescriptionHandler}
              form={form}
            >
            <Form.Item label="Enter disease" name="diseaseName">
              <Input type="text"/>
            </Form.Item>
            <Form.Item label="Enter medicine" name="medicine">
              <Input type="text"/>
            </Form.Item>
            <Form.Item label="Enter duration in weeks" name="weeks">
              <Input type="text"/>
            </Form.Item>
            <button className="btn btn-primary">
              Prescribe 
            </button>
            </Form>
          </Modal>
        </div>
        <div className="w-50 mx-auto">
          <Modal
            forceRender
            title = "Schedule Test"
            open = {showScheduleTestModal}
            onCancel={() => {
              setShowScheduleTestModal(false)
            }} 
            footer = {false}
          >
            <Form 
              layout="vertical" 
              initialValues={{ remember: false }}
              onFinish={submitScheduleTestHandler}
            >
              <Form.Item
                name="CBC"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Complete Blood Count</Checkbox>
              </Form.Item>
              <Form.Item
                name="LP"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Lipid Profile</Checkbox>
              </Form.Item>
              <Form.Item
                name="DT"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Diabetes Test</Checkbox>
              </Form.Item>
              <Form.Item
                name="CT"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Calcium Test</Checkbox>
              </Form.Item>
              <Form.Item
                name="KFT"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Kidney Function Test</Checkbox>
              </Form.Item>
              <Form.Item
                name="LFT"
                initialValue={false}
                valuePropName="checked"
              >
                <Checkbox>Liver Function Test</Checkbox>
              </Form.Item>
            <button className="btn btn-primary">
              Schedule 
            </button>
            </Form>
          </Modal>
        </div>
        <div className="w-50 mx-auto my-2">
          <p className="text-success font-bold">{showLogs.toUpperCase()} Log messages of {data && data.pName}</p>
          {/* {showLogs === 'temperature' && <Table columns={columns} dataSource={tempLogs} />}
          {showLogs === 'spo2' && <Table columns={columns} dataSource={spO2Logs} />}
          {showLogs === 'heart-rate' && <Table columns={columns} dataSource={hrLogs} />} */}
          {
            showLogs === 'temperature' ? 
            <Table columns={columns} dataSource={tempLogs} /> :
            showLogs === 'spo2' ? 
            <Table columns={columns} dataSource={spO2Logs} /> :
            <Table columns={columns} dataSource={hrLogs} />
          }
        </div>
        <div className="w-50 mx-auto">
          <Button type="primary" onClick={downloadReport}>Download Report</Button>
         { redirectFrom==="doctor" && 
          <Button type="danger" onClick={() => setShowModal(true)}> Prescribe Medicine </Button>
        }
          {redirectFrom==="doctor" && <Button type="success" onClick={() => setShowScheduleTestModal(true)}>Schedule tests</Button>}
          <Button type="success" onClick={() => setShowMedicineModal(true)}>Medicine</Button>
          <Button type="success" onClick={() => setShowTest(true)}>Test</Button>
          <div className="w-50 mx-auto">
            <Modal
              forceRender
              title = "Ongoing Medicine"
              open = {showMedicineModal}
              onCancel={() => {
                setShowMedicineModal(false)
              }} 
              footer = {false}
            >
              <Table columns={prescriotionColumns} dataSource={prescriptions} />
            </Modal>
          </div>

          {tests && <div className="w-50 mx-auto">
            <Modal
              forceRender
              title = "Given Test"
              open = {showTest}
              onCancel={() => {
                setShowTest(false)
              }} 
              footer = {false}
            >
              <ul>
                {tests.CBC && <li>Complete Blood Count</li>}
                {tests.LP && <li>Lipid Profile</li>}
                {tests.DT && <li>Diabetes Test</li>}
                {tests.CT && <li>Calcium Test</li>}
                {tests.KFT && <li>Kidney Function Test</li>}
                {tests.LFT && <li>Liver Function Test</li>}
              </ul>
            </Modal>
          </div>}
          
        </div>
      </div>
    </>
  );
};
export default PatientDetails;
