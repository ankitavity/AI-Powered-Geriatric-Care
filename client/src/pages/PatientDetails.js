import { React, useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Table,
  Popconfirm,
  message,
  Select,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  MedicineBoxOutlined,
  FileDoneOutlined,
  ScheduleOutlined,
  DownloadOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useLocation } from "react-router-dom";

const PatientDetails = () => {
  const location = useLocation();
  const id = location.state.id;
  const redirectFrom = location.state.redirectFrom;

  const [data, setData] = useState(null);
  const [logs, setLogs] = useState(null);
  const [prescriptions, setPrescriptions] = useState(null);
  const [tests, setTests] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showLogs, setShowLogs] = useState("temperature");
  const [showScheduleTestModal, setShowScheduleTestModal] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [prediction, setPrediction] = useState({});

  let tempLogs = [];
  let spO2Logs = [];
  let hrLogs = [];

  if (logs) {
    for (let i = 0; i < logs.length; i++) {
      if (logs[i].type == 0) {
        tempLogs.push(logs[i]);
      } else if (logs[i].type == 1) {
        spO2Logs.push(logs[i]);
      } else {
        hrLogs.push(logs[i]);
      }
    }
  }

  const getPatDetails = async () => {
    const resp = await axios.post(
      "http://192.168.88.150:7000/api/v1/patient/patdetails",
      { id }
    );
    setData(resp.data.data);
    setLogs(resp.data.logs);
    setPrescriptions(resp.data.prescriptions);
    setTests(resp.data.tests);
    setPrediction(resp.data.prediction);
  };

  const sendEmail = async (subject, text) => {
    const resp = await axios.post(
      "http://192.168.88.150:7000/api/v1/patient/sendEmail",
      {
        email: data.email,
        subject: subject,
        text: text,
      }
    );

    alert("Message sent");
  };

  useEffect(() => {
    getPatDetails();
  }, []);

  const columns = [
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Value",
      render: (text, record) =>
        record.value >= 102 ? (
          <p className="fw-bold text-danger">{record.value}</p>
        ) : (
          <p>{record.value}</p>
        ),
    },
  ];

  const handleMedicineRemove = async (record) => {
    try {
      const res = await axios.post(
        "http://192.168.88.150:7000/api/v1/prescribe/delete",
        {
          prescriptionId: record._id,
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getPatDetails();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  const prescriotionColumns = [
    {
      title: "Cause",
      dataIndex: "diseaseName",
    },
    {
      title: "Medicine",
      dataIndex: "medicine",
    },
    {
      title: "Duration",
      dataIndex: "weeks",
    },
    {
      title: "Stop",
      render: (text, record) => (
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
      ),
    },
  ];

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
  };

  const [form] = Form.useForm();

  const submitPrescriptionHandler = async (val) => {
    console.log(val);
    const resp = await axios.post(
      "http://192.168.88.150:7000/api/v1/prescribe/add",
      {
        ...val,
        patientEmail: data.email,
      }
    );
    if (resp.data.success) {
      alert(resp.data.message);
      form.resetFields();
      getPatDetails();
    } else alert(resp.data.message);
  };

  const setLogsChange = (val) => {
    setShowLogs(val);
  };

  const submitScheduleTestHandler = async (val) => {
    const resp = await axios.post(
      "http://192.168.88.150:7000/api/v1/schedule/update",
      {
        ...val,
        patientEmail: data.email,
      }
    );
    if (resp.data.success) {
      message.success(resp.data.message);
    } else message.error(resp.data.message);
  };

  return (
    <div className="patient-details-page">
      {/* Vibrant Hero Section with Animated Background */}
      <div className="hero-section-animated text-center py-5">
        <div className="animated-bg"></div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="hero-content p-4 rounded-lg">
                <div className="animated-icon-container mb-3">
                  <HeartOutlined className="animated-icon" />
                </div>
                <h1 className="display-4 fw-bold mb-3 text-white glow-text">
                  Patient Dashboard
                </h1>
                <p className="lead text-white mb-4 highlight-text">
                  Hello{" "}
                  {redirectFrom === "guardian" && data
                    ? data.guardianName
                    : redirectFrom}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-n5 mb-5">
        <div className="row">
          {/* Left Column - Logs and Controls */}
          <div className="col-md-6">
            <div className="card shadow-lg logs-card">
              <div className="color-bar-animated"></div>
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="gradient-text">Patient Monitoring</h3>

                  <div className="log-selector mb-4">
                    <Select
                      defaultValue="temperature"
                      style={{ width: "100%" }}
                      onChange={(value) => {
                        setShowLogs(value);
                      }}
                      options={[
                        { value: "temperature", label: "Temperature" },
                        { value: "spo2", label: "SPO2" },
                        { value: "heart-rate", label: "Heart Rate" },
                      ]}
                      className="fancy-select"
                    />
                  </div>
                </div>

                <div className="logs-table">
                  <p className="log-title">
                    {showLogs.toUpperCase()} Log messages of{" "}
                    {data && data.pName}
                  </p>
                  {showLogs === "temperature" ? (
                    <Table columns={columns} dataSource={tempLogs} />
                  ) : showLogs === "spo2" ? (
                    <Table columns={columns} dataSource={spO2Logs} />
                  ) : (
                    <Table columns={columns} dataSource={hrLogs} />
                  )}
                </div>

                <div className="button-container mt-4">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={downloadReport}
                    className="action-button"
                  >
                    Download Report
                  </Button>

                  {redirectFrom === "doctor" && (
                    <>
                      <Button
                        type="danger"
                        icon={<MedicineBoxOutlined />}
                        onClick={() => setShowModal(true)}
                        className="action-button"
                      >
                        Prescribe Medicine
                      </Button>

                      <Button
                        type="success"
                        icon={<ScheduleOutlined />}
                        onClick={() => setShowScheduleTestModal(true)}
                        className="action-button"
                      >
                        Schedule Tests
                      </Button>
                    </>
                  )}

                  <Button
                    type="success"
                    icon={<MedicineBoxOutlined />}
                    onClick={() => setShowMedicineModal(true)}
                    className="action-button"
                  >
                    Medicine
                  </Button>

                  <Button
                    type="success"
                    icon={<FileDoneOutlined />}
                    onClick={() => setShowTest(true)}
                    className="action-button"
                  >
                    Test
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Prediction */}
          <div className="col-md-6">
            <div className="card shadow-lg prediction-card">
              <div className="color-bar-animated"></div>
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h3 className="gradient-text">AI Prediction</h3>
                </div>

                <table className="prediction-table">
                  <thead>
                    <tr>
                      <th colSpan="2">Health Assessment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Disease:</strong>
                      </td>
                      <td>{prediction?.predictedDisease}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Medication:</strong>
                      </td>
                      <td>{prediction?.recommendedMedication}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Severity:</strong>
                      </td>
                      <td>{prediction?.severity}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Additional Advice:</strong>
                      </td>
                      <td>{prediction?.additionalAdvice}</td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Disclaimer:</strong>
                      </td>
                      <td>{prediction?.disclaimer}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        forceRender
        title="Add Prescription"
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        footer={false}
        className="custom-modal"
      >
        <Form
          layout="vertical"
          onFinish={submitPrescriptionHandler}
          form={form}
        >
          <Form.Item label="Enter disease" name="diseaseName">
            <Input type="text" className="fancy-input" />
          </Form.Item>
          <Form.Item label="Enter medicine" name="medicine">
            <Input type="text" className="fancy-input" />
          </Form.Item>
          <Form.Item label="Enter duration in weeks" name="weeks">
            <Input type="text" className="fancy-input" />
          </Form.Item>
          <button className="btn-glow w-100 py-3">
            <span className="btn-text">Prescribe</span>
          </button>
        </Form>
      </Modal>

      <Modal
        forceRender
        title="Schedule Test"
        open={showScheduleTestModal}
        onCancel={() => {
          setShowScheduleTestModal(false);
        }}
        footer={false}
        className="custom-modal"
      >
        <Form
          layout="vertical"
          initialValues={{ remember: false }}
          onFinish={submitScheduleTestHandler}
          className="test-form"
        >
          <Form.Item name="CBC" initialValue={false} valuePropName="checked">
            <Checkbox>Complete Blood Count</Checkbox>
          </Form.Item>
          <Form.Item name="LP" initialValue={false} valuePropName="checked">
            <Checkbox>Lipid Profile</Checkbox>
          </Form.Item>
          <Form.Item name="DT" initialValue={false} valuePropName="checked">
            <Checkbox>Diabetes Test</Checkbox>
          </Form.Item>
          <Form.Item name="CT" initialValue={false} valuePropName="checked">
            <Checkbox>Calcium Test</Checkbox>
          </Form.Item>
          <Form.Item name="KFT" initialValue={false} valuePropName="checked">
            <Checkbox>Kidney Function Test</Checkbox>
          </Form.Item>
          <Form.Item name="LFT" initialValue={false} valuePropName="checked">
            <Checkbox>Liver Function Test</Checkbox>
          </Form.Item>
          <button className="btn-glow w-100 py-3">
            <span className="btn-text">Schedule Tests</span>
          </button>
        </Form>
      </Modal>

      <Modal
        forceRender
        title="Ongoing Medicine"
        open={showMedicineModal}
        onCancel={() => {
          setShowMedicineModal(false);
        }}
        footer={false}
        className="custom-modal"
      >
        <Table columns={prescriotionColumns} dataSource={prescriptions} />
      </Modal>

      {tests && (
        <Modal
          forceRender
          title="Given Test"
          open={showTest}
          onCancel={() => {
            setShowTest(false);
          }}
          footer={false}
          className="custom-modal"
        >
          <ul className="test-list">
            {tests.CBC && <li>Complete Blood Count</li>}
            {tests.LP && <li>Lipid Profile</li>}
            {tests.DT && <li>Diabetes Test</li>}
            {tests.CT && <li>Calcium Test</li>}
            {tests.KFT && <li>Kidney Function Test</li>}
            {tests.LFT && <li>Liver Function Test</li>}
          </ul>
        </Modal>
      )}
    </div>
  );
};

export default PatientDetails;
