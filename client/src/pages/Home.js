import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  HeartFilled,
  CalendarOutlined,
  FileTextOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import AppointmentForm from "../components/AppointmentForm";
import QueryForm from "../components/QueryForm";

const Home = () => {
  return (
    <div className="home-page">
      {/* Animated Hero Section with Gradient Background */}
      <div className="hero-section-animated text-center py-5">
        <div className="animated-bg"></div>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="hero-content p-4 rounded-lg">
                <div className="animated-icon-container mb-3">
                  <HomeOutlined className="animated-icon" />
                </div>
                <h1 className="display-4 fw-bold mb-3 text-white glow-text">
                  Geriatric Care
                </h1>
                <p className="lead text-white mb-4 highlight-text">
                  Specialized care and support for elderly patients
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Enhanced Registration Cards */}
      <Container className="mb-5 mt-n5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="border-0 shadow-lg login-card-enhanced registration-card">
              <div className="color-bar-animated"></div>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="floating-icon-circle mx-auto">
                    <HomeOutlined className="fs-1 text-white" />
                  </div>
                  <h2 className="gradient-text mb-3">
                    Welcome to Our Platform
                  </h2>
                  <p className="text-muted">
                    A connected network of guardians, doctors, and healthcare
                    facilities
                  </p>
                </div>

                <h3 className="text-center mb-4 gradient-text-small">
                  New to Geriatric Care?
                </h3>
                <Row className="justify-content-center mb-4">
                  <Col sm={12} md={4} className="mb-3 mb-md-0">
                    <Link to="/register_pat" className="text-decoration-none">
                      <button className="btn-glow w-100 py-3 btn-teal">
                        <span className="btn-text">Register as Guardian</span>
                      </button>
                    </Link>
                  </Col>
                  <Col sm={12} md={4} className="mb-3 mb-md-0">
                    <Link to="/register_dr" className="text-decoration-none">
                      <button className="btn-glow w-100 py-3 btn-blue">
                        <span className="btn-text">Register as Doctor</span>
                      </button>
                    </Link>
                  </Col>
                  <Col sm={12} md={4}>
                    <Link to="/register_hosp" className="text-decoration-none">
                      <button className="btn-glow w-100 py-3 btn-purple">
                        <span className="btn-text">Register as Hospital</span>
                      </button>
                    </Link>
                  </Col>
                </Row>

                <div className="divider-fancy">
                  <span>Already Registered?</span>
                </div>

                <Row className="justify-content-center">
                  <Col sm={12} md={4} className="mb-3 mb-md-0">
                    <Link to="/login_pat" className="text-decoration-none">
                      <button className="btn-outline-fancy w-100 py-3 btn-outline-teal">
                        Guardian Login
                      </button>
                    </Link>
                  </Col>
                  <Col sm={12} md={4} className="mb-3 mb-md-0">
                    <Link to="/login_dr" className="text-decoration-none">
                      <button className="btn-outline-fancy w-100 py-3 btn-outline-blue">
                        Doctor Login
                      </button>
                    </Link>
                  </Col>
                  <Col sm={12} md={4}>
                    <Link to="/login_hosp" className="text-decoration-none">
                      <button className="btn-outline-fancy w-100 py-3 btn-outline-purple">
                        Hospital Login
                      </button>
                    </Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <AppointmentForm/>
      {/* Services Section with Enhanced Cards */}
      <Container className="benefits-section mb-5">
        <h2 className="text-center mb-4 section-title gradient-text">
          Our Services
        </h2>
        <Row>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-1">
              <div className="benefit-icon">
                <HeartFilled />
              </div>
              <h4>Patient Monitoring</h4>
              <p>
                Real-time health tracking and updates for guardians and
                healthcare providers
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-2">
              <div className="benefit-icon">
                <CalendarOutlined />
              </div>
              <h4>Appointment Management</h4>
              <p>
                Easily schedule and manage doctor appointments and hospital
                visits
              </p>
            </div>
          </Col>
          <Col md={4} className="mb-4">
            <div className="benefit-card benefit-card-3">
              <div className="benefit-icon">
                <FileTextOutlined />
              </div>
              <h4>Medical Records</h4>
              <p>
                Secure access to patient history, medications, and treatment
                plans
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Enhanced Testimonials Section */}
      <div className="testimonials-section py-5">
        <div className="animated-bg"></div>
        <Container>
          <h2 className="text-center mb-5 section-title text-white glow-text">
            What Our Users Say
          </h2>
          <Row className="justify-content-center">
            <Col md={4} className="mb-4">
              <Card className="testimonial-card border-0 shadow-lg h-100">
                <div className="color-bar-testimonial-1"></div>
                <Card.Body className="p-4">
                  <div className="quote-icon mb-3">
                    <i className="bi bi-quote fs-1 text-primary-light"></i>
                  </div>
                  <p className="testimonial-text">
                    "This platform has made managing my father's care so much
                    easier. I can coordinate with his doctors and access his
                    records all in one place."
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 gradient-text-small">Sarah Johnson</h5>
                    <p className="text-muted">Guardian</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="testimonial-card border-0 shadow-lg h-100">
                <div className="color-bar-testimonial-2"></div>
                <Card.Body className="p-4">
                  <div className="quote-icon mb-3">
                    <i className="bi bi-quote fs-1 text-primary-light"></i>
                  </div>
                  <p className="testimonial-text">
                    "As a geriatric specialist, this system streamlines my
                    practice and allows me to provide better care with easy
                    access to patient history."
                  </p>
                  <div className="testimonial-author">
                    <h5 className="mb-0 gradient-text-small">Dr. James Chen</h5>
                    <p className="text-muted">Geriatrician</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <QueryForm/>

      {/* Footer with Contact/Newsletter Section */}
      <footer className="home-footer mt-5 pt-5" style={{background: 'linear-gradient(135deg, #0061ff, #60efff)', color: '#fff', borderTopLeftRadius: '2rem', borderTopRightRadius: '2rem'}}>
        {/* <div className="newsletter-section py-4 px-3 px-md-5 d-flex flex-column flex-md-row align-items-center justify-content-between" style={{borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
          <div className="mb-3 mb-md-0">
            <h3 className="fw-bold mb-1" style={{color: '#fff'}}>Keep up to date with Geriatric Care news</h3>
            <small style={{color: 'rgba(255,255,255,0.8)'}}>Subscribe to our newsletter for articles, events, and offers. You can unsubscribe at any time.</small>
          </div>
          <form className="d-flex flex-wrap gap-2 align-items-center mt-3 mt-md-0" style={{minWidth: '320px'}}>
            <input type="text" className="form-control bg-transparent text-white border-0 border-bottom me-2" placeholder="First name" style={{minWidth: '120px'}} />
            <input type="text" className="form-control bg-transparent text-white border-0 border-bottom me-2" placeholder="Last name" style={{minWidth: '120px'}} />
            <input type="email" className="form-control bg-transparent text-white border-0 border-bottom me-2" placeholder="Email address *" style={{minWidth: '180px'}} required />
            <button type="submit" className="btn btn-outline-light px-4 py-2 rounded-pill" style={{border: '2px solid #fff'}}>SIGN UP</button>
          </form>
        </div> */}
        <div className="container py-5">
          <div className="row gy-4 align-items-start">
            <div className="col-md-4">
              <div className="mb-3 d-flex align-items-center gap-2">
                <span className="fw-bold fs-4" style={{letterSpacing: '1px'}}>Geriatric Care</span>
              </div>
              <p style={{color: 'rgba(255,255,255,0.8)'}}>Empowering teams to transform elderly care into clear, compassionate action — making insights easier to share, understand, and act on.</p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-white" aria-label="X"><i className="bi bi-twitter-x fs-5"></i></a>
                <a href="#" className="text-white" aria-label="Instagram"><i className="bi bi-instagram fs-5"></i></a>
                <a href="#" className="text-white" aria-label="LinkedIn"><i className="bi bi-linkedin fs-5"></i></a>
                <a href="#" className="text-white" aria-label="GitHub"><i className="bi bi-github fs-5"></i></a>
              </div>
            </div>
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Product</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50 text-decoration-none">Features</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Pricing</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Integrations</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Changelog</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Resources</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50 text-decoration-none">Documentation</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Tutorials</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Blog</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Support</a></li>
              </ul>
            </div>
            <div className="col-md-2">
              <h6 className="fw-bold mb-3">Company</h6>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white-50 text-decoration-none">About</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Careers</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-white-50 text-decoration-none">Partners</a></li>
              </ul>
            </div>
          </div>
          <hr style={{borderColor: 'rgba(255,255,255,0.1)'}} />
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center py-3">
            <span className=" fw-bold">© {new Date().getFullYear()} Geriatric Care. All rights reserved.</span>
            <div className="d-flex gap-3 mt-2 mt-md-0">
              <a href="#" className="text-white fw-bold text-decoration-none">Privacy Policy</a>
              <a href="#" className="text-white fw-bold text-decoration-none">Terms of Service</a>
              <a href="#" className="text-white fw-bold text-decoration-none">Cookies Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
