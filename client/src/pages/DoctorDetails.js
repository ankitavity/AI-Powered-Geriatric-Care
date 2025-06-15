import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Spin,
  Avatar,
  Card,
  Badge,
  Statistic,
  Row,
  Col,
  Typography,
  Alert,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  UserOutlined,
  HeartFilled,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

const DoctorDetails = () => {
  const navigate = useNavigate();
  const doctor = JSON.parse(window.localStorage.getItem("doctorDetails"));
  const [pat, setPat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPatientDetails = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(
        "https://ai-powered-geriatric-care.onrender.com/api/v1/dr/get_pat_details",
        { email: doctor.email }
      );
      setPat(resp.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load patient data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, []);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "pName",
      key: "pName",
      render: (text) => (
        <div className="patient-name">
          <Avatar icon={<UserOutlined />} className="avatar-icon" />
          <Text strong className="ml-2">
            {text}
          </Text>
        </div>
      ),
    },
    {
      title: "Guardian Name",
      dataIndex: "guardianName",
      key: "guardianName",
      render: (text) => (
        <div className="guardian-info">
          <TeamOutlined className="info-icon" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Guardian Phone",
      dataIndex: "guardianPhone",
      key: "guardianPhone",
      render: (text) => (
        <div className="guardian-info">
          <PhoneOutlined className="info-icon" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Guardian Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div className="guardian-info">
          <MailOutlined className="info-icon" />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Patient Details",
      key: "action",
      render: (_, record) => (
        <button
          className="view-details-btn"
          onClick={() =>
            navigate("/pat_details", {
              state: { redirectFrom: "doctor", id: record._id },
            })
          }
        >
          View Details <ArrowRightOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="doctor-dashboard">
      {/* Doctor Welcome Card */}
      <Card className="welcome-card">
        <Row gutter={[24, 24]} align="middle">
          <Col xs={24} md={6} className="text-center">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              className="doctor-avatar"
            />
          </Col>
          <Col xs={24} md={18}>
            <Title level={2}>Welcome, Dr. {doctor.drName}</Title>
            <Text type="secondary">Geriatric Specialist</Text>

            <Row gutter={16} className="stats-row">
              <Col span={8}>
                <Statistic
                  title="Patients"
                  value={pat ? pat.length : 0}
                  prefix={<HeartFilled className="stat-icon" />}
                />
              </Col>
              <Col span={8}>
                <Statistic title="Today's Appointments" value="3" />
              </Col>
              <Col span={8}>
                <Statistic
                  title="New Patients"
                  value="2"
                  suffix={<Badge status="processing" text="new" />}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {/* Patient List Section */}
      <Card className="patient-list-card">
        <Title level={4} className="section-title">
          <HeartFilled className="section-icon" /> Patient List
        </Title>

        {error && (
          <Alert message={error} type="error" showIcon className="mb-4" />
        )}

        {loading ? (
          <div className="loading-container">
            <Spin size="large" />
            <Text className="loading-text">Loading patient data...</Text>
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={pat}
            rowKey="_id"
            pagination={{
              pageSize: 10,
              position: ["bottomCenter"],
              showTotal: (total) => `Total ${total} patients`,
            }}
            className="custom-table"
          />
        )}
      </Card>
    </div>
  );
};

export default DoctorDetails;
