import React, { useState } from "react";
import { Form, Input, message, Spin } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  PhoneOutlined,
  MedicineBoxOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

const RegisterDr = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (inputs) => {
    try {
      setLoading(true);
      console.log(inputs);
      const resp = await axios.post(
        "https://ai-powered-geriatric-care.onrender.com/api/v1/dr/register",
        inputs
      );

      if (resp.data.success) {
        setLoading(false);
        message.success("Registered successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        setLoading(false);
        message.error(resp.data.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      message.error(error.message || "An error occurred during registration");
    }
  };

  return (
    <div className="register-doctor-page">
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
                  Medical Professional Portal
                </h1>
                <p className="lead text-white mb-4 highlight-text">
                  Join our network and provide exceptional care to patients
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Enhanced Colorful Registration Card */}
      <Container className="mb-5 mt-n5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="border-0 shadow-lg registration-card-enhanced">
              <div className="color-bar-animated"></div>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="floating-icon-circle mx-auto">
                    <MedicineBoxOutlined className="fs-1 text-white" />
                  </div>
                  <h2 className="gradient-text mb-3">Doctor Registration</h2>
                  <p className="text-muted">
                    Create your account to start providing healthcare services
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-4">
                    <Spin size="large" />
                    <p className="mt-3 text-muted">
                      Processing registration...
                    </p>
                  </div>
                ) : (
                  <Form
                    layout="vertical"
                    onFinish={submitHandler}
                    className="registration-form"
                    requiredMark={false}
                  >
                    <Form.Item
                      label={<span className="form-label">Doctor Name</span>}
                      name="drName"
                      rules={[
                        { required: true, message: "Please enter doctor name" },
                      ]}
                    >
                      <Input
                        prefix={<UserOutlined className="text-primary" />}
                        placeholder="Dr. John Smith"
                        className="fancy-input"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="form-label">Email Address</span>}
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Please enter email address",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email",
                        },
                      ]}
                    >
                      <Input
                        prefix={<MailOutlined className="text-primary" />}
                        placeholder="doctor@example.com"
                        type="email"
                        className="fancy-input"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="form-label">Password</span>}
                      name="password"
                      rules={[
                        { required: true, message: "Please enter password" },
                      ]}
                    >
                      <Input.Password
                        prefix={<LockOutlined className="text-primary" />}
                        placeholder="Create a secure password"
                        className="fancy-input"
                      />
                    </Form.Item>

                    <Form.Item
                      label={<span className="form-label">Phone Number</span>}
                      name="drPhone"
                      rules={[
                        {
                          required: true,
                          message: "Please enter phone number",
                        },
                      ]}
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-primary" />}
                        placeholder="+1 (555) 123-4567"
                        className="fancy-input"
                      />
                    </Form.Item>

                    <Form.Item className="mb-3">
                      <button className="btn-glow w-100 py-3" type="submit">
                        <span className="btn-text">Register as Doctor</span>
                      </button>
                    </Form.Item>
                  </Form>
                )}

                <div className="text-center mt-4">
                  <div className="divider-fancy">
                    <span>Already have an account?</span>
                  </div>
                  <Link to="/" className="text-decoration-none">
                    <button className="btn-outline-fancy mt-3">
                      Login to Your Account
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
                <i className="bi bi-clipboard-pulse"></i>
              </div>
              <h4>Patient Management</h4>
              <p>Easily manage appointments and patient records</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-2">
              <div className="benefit-icon">
                <i className="bi bi-calendar-check"></i>
              </div>
              <h4>Secure Communication</h4>
              <p>Connect with patients and other healthcare providers</p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-3">
              <div className="benefit-icon">
                <i className="bi bi-graph-up"></i>
              </div>
              <h4>Healthcare Analytics</h4>
              <p>Track patient progress and treatment outcomes</p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* CSS Styles */}
      <style jsx>{`
        /* Animated Hero Section */
        .register-doctor-page .hero-section-animated {
          background: linear-gradient(135deg, #0061ff, #60efff);
          position: relative;
          overflow: hidden;
        }

        .register-doctor-page .animated-bg {
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

        .register-doctor-page .hero-content {
          position: relative;
          z-index: 2;
        }

        .register-doctor-page .glow-text {
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

        .register-doctor-page .highlight-text {
          background: rgba(255, 255, 255, 0.15);
          padding: 8px 16px;
          border-radius: 20px;
          display: inline-block;
        }

        .register-doctor-page .animated-icon-container {
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

        .register-doctor-page .animated-icon {
          font-size: 2.5rem;
          color: white;
        }

        /* Enhanced Registration Card */
        .register-doctor-page .registration-card-enhanced {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          background: linear-gradient(to bottom, #ffffff, #f8f9ff);
        }

        .register-doctor-page .color-bar-animated {
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

        .register-doctor-page .floating-icon-circle {
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

        .register-doctor-page .gradient-text {
          background: linear-gradient(90deg, #0061ff, #60efff);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 700;
          font-size: 2rem;
        }

        .register-doctor-page .form-label {
          color: #495057;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .register-doctor-page .fancy-input {
          height: 50px;
          border-radius: 10px;
          border: 2px solid #e1e5ee;
          transition: all 0.3s;
        }

        .register-doctor-page .fancy-input:focus,
        .register-doctor-page .fancy-input:hover {
          border-color: #0061ff;
          box-shadow: 0 0 0 3px rgba(0, 97, 255, 0.1);
        }

        .register-doctor-page .btn-glow {
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

        .register-doctor-page .btn-glow:before {
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

        .register-doctor-page .btn-glow:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 97, 255, 0.4);
        }

        .register-doctor-page .btn-text {
          position: relative;
          z-index: 2;
        }

        .register-doctor-page .divider-fancy {
          display: flex;
          align-items: center;
          text-align: center;
          color: #8e94a3;
          margin: 20px 0;
        }

        .register-doctor-page .divider-fancy::before,
        .register-doctor-page .divider-fancy::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #e1e5ee;
        }

        .register-doctor-page .divider-fancy::before {
          margin-right: 1em;
        }

        .register-doctor-page .divider-fancy::after {
          margin-left: 1em;
        }

        .register-doctor-page .btn-outline-fancy {
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

        .register-doctor-page .btn-outline-fancy::before {
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

        .register-doctor-page .btn-outline-fancy:hover {
          background: linear-gradient(90deg, #0061ff, #60efff);
          color: white;
          transform: translateY(-2px);
        }

        /* Benefits Section */
        .register-doctor-page .benefits-section {
          padding: 50px 0;
          background: #f8f9ff;
        }

        .register-doctor-page .benefit-card {
          background: white;
          border-radius: 16px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
          height: 100%;
          border-top: 5px solid;
        }

        .register-doctor-page .benefit-card-1 {
          border-color: #0061ff;
        }

        .register-doctor-page .benefit-card-2 {
          border-color: #4adede;
        }

        .register-doctor-page .benefit-card-3 {
          border-color: #60efff;
        }

        .register-doctor-page .benefit-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .register-doctor-page .benefit-icon {
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

        .register-doctor-page .benefit-card h4 {
          color: #0061ff;
          margin-bottom: 15px;
          font-weight: 600;
        }

        .register-doctor-page .benefit-card p {
          color: #6c757d;
        }
      `}</style>
    </div>
  );
};

export default RegisterDr;
