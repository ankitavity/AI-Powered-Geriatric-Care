import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Spin,
  Card,
  Badge,
  Statistic,
  Row,
  Col,
  Typography,
  Alert,
  Tabs,
  Input,
  Button,
  Tag,
  Empty,
  Tooltip,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  MedicineBoxOutlined,
  TeamOutlined,
  PhoneOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
  CalendarOutlined,
  BellOutlined,
  ArrowRightOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const HospDetails = () => {
  const navigate = useNavigate();
  const [pat, setPat] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchText, setSearchText] = useState("");

  const hospital = JSON.parse(window.localStorage.getItem("hospitalDetails"));

  const getPatientDetails = async () => {
    try {
      setLoading(true);
      const resp = await axios.post(
        "http://192.168.88.150:7000/api/v1/hosp/get_pat_details",
        { email: hospital.email }
      );
      setPat(resp.data.data);
      setFilteredData(resp.data.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load patient data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatientDetails();
  }, []);

  useEffect(() => {
    if (pat && searchText) {
      const filtered = pat.filter(
        (patient) =>
          patient.pName.toLowerCase().includes(searchText.toLowerCase()) ||
          patient.guardianName
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredData(filtered);
    } else if (pat) {
      setFilteredData(pat);
    }
  }, [searchText, pat]);

  const columns = [
    {
      title: "Patient Name",
      dataIndex: "pName",
      key: "pName",
      render: (text, record) => (
        <div className="patient-name">
          <Badge status={record.status === "active" ? "success" : "default"} />
          <span className="ml-2">{text}</span>
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
              state: { redirectFrom: "hospital", id: record._id },
            })
          }
        >
          View Records <ArrowRightOutlined />
        </button>
      ),
    },
  ];

  const recentAdmissions = [
    { name: "John Smith", date: "Yesterday", condition: "Heart condition" },
    { name: "Maria Garcia", date: "2 days ago", condition: "Pneumonia" },
    { name: "Robert Chen", date: "3 days ago", condition: "Hip replacement" },
  ];

  return (
    <div className="hospital-dashboard">
      {/* Hospital Welcome Header */}
      <div className="hospital-header">
        <div className="hospital-title">
          <MedicineBoxOutlined className="hospital-icon" />
          <Title level={2}>{hospital.hospitalName}</Title>
        </div>
        <div className="notification-area">
          <Tooltip title="Notifications">
            <Badge count={3} offset={[-5, 5]}>
              <Button
                type="text"
                icon={<BellOutlined />}
                size="large"
                className="notification-btn"
              />
            </Badge>
          </Tooltip>
        </div>
      </div>

      {/* Statistics Overview */}
      <Row gutter={[16, 16]} className="stats-row">
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card primary-card">
            <Statistic
              title="Total Patients"
              value={pat ? pat.length : 0}
              prefix={<TeamOutlined />}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card success-card">
            <Statistic
              title="Available Beds"
              value="28"
              suffix="/ 45"
              prefix={<MedicineBoxOutlined />}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card warning-card">
            <Statistic
              title="New Admissions"
              value="7"
              prefix={<UserOutlined />}
              className="stat-content"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stat-card info-card">
            <Statistic
              title="Today's Appointments"
              value="12"
              prefix={<CalendarOutlined />}
              className="stat-content"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content Tabs */}
      <Card className="content-card">
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane
            tab={
              <span>
                <TeamOutlined /> Patient List
              </span>
            }
            key="1"
          >
            {error && (
              <Alert message={error} type="error" showIcon className="mb-4" />
            )}

            <div className="table-header">
              <Input
                placeholder="Search patients..."
                prefix={<SearchOutlined />}
                onChange={(e) => setSearchText(e.target.value)}
                className="search-input"
              />

              <div className="patient-status">
                <Text>Total: </Text>
                <Tag color="processing">{pat ? pat.length : 0} Patients</Tag>
              </div>
            </div>

            {loading ? (
              <div className="loading-container">
                <Spin size="large" />
                <Text className="loading-text">Loading patient data...</Text>
              </div>
            ) : filteredData && filteredData.length > 0 ? (
              <Table
                columns={columns}
                dataSource={filteredData}
                rowKey="_id"
                pagination={{
                  pageSize: 10,
                  position: ["bottomCenter"],
                  showTotal: (total) => `Total ${total} patients`,
                }}
                className="custom-table"
              />
            ) : (
              <Empty
                description={
                  searchText
                    ? "No matching patients found"
                    : "No patients in the system"
                }
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className="empty-state"
              />
            )}
          </TabPane>

          <TabPane
            tab={
              <span>
                <ClockCircleOutlined /> Recent Admissions
              </span>
            }
            key="2"
          >
            <div className="recent-admissions">
              {recentAdmissions.map((admission, index) => (
                <Card key={index} className="admission-card">
                  <div className="admission-info">
                    <div className="patient-avatar">
                      <UserOutlined />
                    </div>
                    <div className="admission-details">
                      <Text strong>{admission.name}</Text>
                      <Text type="secondary">
                        <ClockCircleOutlined /> {admission.date}
                      </Text>
                      <Tag color="blue">{admission.condition}</Tag>
                    </div>
                  </div>
                  <Button type="primary" ghost>
                    View Details
                  </Button>
                </Card>
              ))}
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default HospDetails;
