import React from "react";
import axios from "axios";
import { Form, Input, message } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  LockOutlined,
  MailOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";

const LoginHosp = () => {
  const navigate = useNavigate();

  const submitHandler = async (val) => {
    try {
      const resp = await axios.post(
        "https://ai-powered-geriatric-care.onrender.com/api/v1/hosp/login",
        val
      );
      if (resp.data.success) {
        message.success(resp.data.message);
        console.log(resp.data);
        const myObject = {
          _id: resp.data.data._id,
          email: resp.data.data.email,
          hospitalName: resp.data.data.HospName,
          hospitalPhone: resp.data.data.HospPhone,
          hospitalAddress: resp.data.data.HospAddress,
        };
        window.localStorage.setItem(
          "hospitalDetails",
          JSON.stringify(myObject)
        );
        navigate("/hosp_details");
      } else message.error(resp.data.message);
    } catch (error) {
      message.error(error.message || "Login failed");
    }
  };

  return (
    <div className="login-page-hosp">
      {/* Vibrant Hero Section with Animated Background */}
      <div className="hero-section-animated text-center py-5">
        <div className="animated-bg"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="hero-content p-4 rounded-lg">
                <div className="animated-icon-container mb-3">
                  <MedicineBoxOutlined className="animated-icon" />
                </div>
                <h1 className="display-4 fw-bold mb-3 text-white glow-text">
                  Hospital Portal
                </h1>
                <p className="lead text-white mb-4 highlight-text">
                  Welcome back to your healthcare management system
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Enhanced Colorful Login Card */}
      <Container className="mb-5 mt-n5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg login-card-enhanced">
              <div className="color-bar-animated"></div>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="floating-icon-circle mx-auto">
                    <MedicineBoxOutlined className="fs-1 text-white" />
                  </div>
                  <h2 className="gradient-text mb-3">
                    Welcome Back, Hospital Admin
                  </h2>
                  <p className="text-muted">
                    Access your hospital management dashboard
                  </p>
                </div>

                <Form
                  layout="vertical"
                  onFinish={submitHandler}
                  className="login-form"
                >
                  <Form.Item
                    label={<span className="form-label">Email Address</span>}
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      prefix={<MailOutlined className="text-primary" />}
                      type="email"
                      placeholder="hospital@example.com"
                      className="fancy-input"
                    />
                  </Form.Item>

                  <Form.Item
                    label={<span className="form-label">Password</span>}
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="text-primary" />}
                      placeholder="Enter your secure password"
                      className="fancy-input"
                    />
                  </Form.Item>

                  <Form.Item className="mb-3">
                    <button className="btn-glow w-100 py-3">
                      <span className="btn-text">Login to Dashboard</span>
                    </button>
                  </Form.Item>
                </Form>

                <div className="text-center mt-4">
                  <p className="forgot-password mb-3">
                    <a href="#" className="gradient-text-link">
                      Forgot password?
                    </a>
                  </p>
                  <div className="divider-fancy">
                    <span>New to the platform?</span>
                  </div>
                  <Link to="/register_hosp" className="text-decoration-none">
                    <button className="btn-outline-fancy mt-3">
                      Register Hospital
                    </button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Colorful Benefits Section */}
      <Container className="benefits-section mb-5">
        <Row>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-1">
              <div className="benefit-icon">
                <i className="bi bi-hospital"></i>
              </div>
              <h4>Patient Management</h4>
              <p>Efficiently manage patient records and medical histories</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-2">
              <div className="benefit-icon">
                <i className="bi bi-graph-up"></i>
              </div>
              <h4>Analytics Dashboard</h4>
              <p>Gain insights with real-time data and comprehensive reports</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-3">
              <div className="benefit-icon">
                <i className="bi bi-shield-check"></i>
              </div>
              <h4>Secure Platform</h4>
              <p>
                Advanced security protocols to protect sensitive patient data
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS Styles */}
      <style jsx>{`
        /* Animated Hero Section */
        .login-page-hosp .hero-section-animated {
          background: linear-gradient(135deg, #0061ff, #60efff);
          position: relative;
          overflow: hidden;
        }

        .login-page-hosp .animated-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="18" fill="%23ffffff22"/><circle cx="60" cy="70" r="20" fill="%23ffffff11"/><circle cx="90" cy="40" r="15" fill="%23ffffff1a"/></svg>');
          background-size: 600px 600px;
          animation: bg-move 30s linear infinite;
          opacity: 0.3;
        }

        @keyframes bg-move {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 600px 600px;
          }
        }

        .login-page-hosp .hero-content {
          position: relative;
          z-index: 2;
        }

        .login-page-hosp .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7);
          animation: glow 2s ease-in-out infinite alternate;
        }

        @keyframes glow {
          from {
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
          }
          to {
            text-shadow: 0 0 15px rgba(255, 255, 255, 0.8),
              0 0 20px rgba(0, 180, 255, 0.8);
          }
        }

        .login-page-hosp .highlight-text {
          background: rgba(255, 255, 255, 0.15);
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .login-page-hosp .animated-icon-container {
          height: 80px;
          width: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          margin: 0 auto;
          animation: bounce 2s ease infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .login-page-hosp .animated-icon {
          font-size: 2.5rem;
          color: white;
        }

        /* Enhanced Login Card */
        .login-page-hosp .login-card-enhanced {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(to bottom, #ffffff, #f8f9ff);
        }

        .login-page-hosp .color-bar-animated {
          height: 8px;
          background: linear-gradient(90deg, #0061ff, #60efff, #0061ff);
          background-size: 200% 100%;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .login-page-hosp .floating-icon-circle {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0061ff, #60efff);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 20px rgba(0, 97, 255, 0.3);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 97, 255, 0.4);
          }
          70% {
            box-shadow: 0 0 0 15px rgba(0, 97, 255, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 97, 255, 0);
          }
        }

        .login-page-hosp .gradient-text {
          background: linear-gradient(90deg, #0061ff, #60efff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          font-size: 2rem;
        }

        .login-page-hosp .form-label {
          color: #495057;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .login-page-hosp .fancy-input {
          height: 50px;
          border-radius: 10px;
          border: 2px solid #e1e5ee;
          transition: all 0.3s;
        }

        .login-page-hosp .fancy-input:focus,
        .login-page-hosp .fancy-input:hover {
          border-color: #0061ff;
          box-shadow: 0 0 0 3px rgba(0, 97, 255, 0.1);
        }

        .login-page-hosp .btn-glow {
          border: none;
          border-radius: 12px;
          background: linear-gradient(90deg, #0061ff, #60efff);
          color: white;
          font-weight: bold;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s;
          box-shadow: 0 5px 15px rgba(0, 97, 255, 0.3);
        }

        .login-page-hosp .btn-glow:before {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent
          );
          animation: shine 2s infinite;
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }

        .login-page-hosp .btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 97, 255, 0.4);
        }

        .login-page-hosp .btn-text {
          position: relative;
          z-index: 2;
        }

        .login-page-hosp .gradient-text-link {
          background: linear-gradient(90deg, #0061ff, #60efff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 600;
          text-decoration: none;
        }

        .login-page-hosp .divider-fancy {
          display: flex;
          align-items: center;
          text-align: center;
          color: #8e94a3;
          margin: 20px 0;
        }

        .login-page-hosp .divider-fancy::before,
        .login-page-hosp .divider-fancy::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #e1e5ee;
        }

        .login-page-hosp .divider-fancy::before {
          margin-right: 1em;
        }

        .login-page-hosp .divider-fancy::after {
          margin-left: 1em;
        }

        .login-page-hosp .btn-outline-fancy {
          padding: 12px 24px;
          border: 2px solid transparent;
          background: white;
          color: #0061ff;
          font-weight: 600;
          border-radius: 10px;
          transition: all 0.3s;
          position: relative;
          background-clip: padding-box;
        }

        .login-page-hosp .btn-outline-fancy::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: -1;
          margin: -2px;
          border-radius: inherit;
          background: linear-gradient(90deg, #0061ff, #60efff);
        }

        .login-page-hosp .btn-outline-fancy:hover {
          background: linear-gradient(90deg, #0061ff, #60efff);
          color: white;
          transform: translateY(-2px);
        }

        /* Benefits Section */
        .login-page-hosp .benefits-section {
          padding: 50px 0;
          background: #f8f9ff;
        }

        .login-page-hosp .benefit-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          height: 100%;
          border-top: 5px solid;
        }

        .login-page-hosp .benefit-card-1 {
          border-color: #0061ff;
        }

        .login-page-hosp .benefit-card-2 {
          border-color: #4adede;
        }

        .login-page-hosp .benefit-card-3 {
          border-color: #60efff;
        }

        .login-page-hosp .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .login-page-hosp .benefit-icon {
          font-size: 2.5rem;
          margin-bottom: 15px;
          color: #0061ff;
          height: 70px;
          width: 70px;
          line-height: 70px;
          margin: 0 auto 20px;
          background: linear-gradient(
            135deg,
            rgba(0, 97, 255, 0.1),
            rgba(96, 239, 255, 0.1)
          );
          border-radius: 50%;
        }

        .login-page-hosp .benefit-card h4 {
          color: #0061ff;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .login-page-hosp .benefit-card p {
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default LoginHosp;
