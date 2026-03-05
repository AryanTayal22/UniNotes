import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={7}>
              <div className="mb-4">
                <span 
                  style={{ 
                    background: 'rgba(59, 130, 246, 0.2)', 
                    color: '#3B82F6',
                    padding: '0.5rem 1rem', 
                    borderRadius: '50px',
                    fontSize: '0.875rem',
                    fontWeight: 500
                  }}
                >
                  ✨ AI-Powered Study Platform
                </span>
              </div>
              <h1 className="hero-title">
                The smarter way to<br />
                study & share notes
              </h1>
              <p className="hero-subtitle mb-5">
                Upload your notes, discover study materials from peers, 
                and generate AI-powered summaries. Built for students who want to excel.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <Button 
                  as={Link} 
                  to="/browse" 
                  variant="primary" 
                  size="lg"
                  style={{ 
                    borderRadius: '12px', 
                    padding: '1rem 2rem',
                    fontWeight: 600
                  }}
                >
                  Explore Notes →
                </Button>
                {!isAuthenticated && (
                  <Button 
                    as={Link} 
                    to="/signup" 
                    variant="outline-primary" 
                    size="lg"
                    style={{ 
                      borderRadius: '12px', 
                      padding: '1rem 2rem',
                      fontWeight: 600
                    }}
                  >
                    Get Started Free
                  </Button>
                )}
              </div>
              
              {/* Stats */}
              <div className="d-flex gap-5 mt-5 pt-4">
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937' }}>500+</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Study Notes</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937' }}>1K+</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Active Users</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1f2937' }}>50+</div>
                  <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>Subjects</div>
                </div>
              </div>
            </Col>
            <Col lg={5} className="d-none d-lg-block">
              <div 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '24px',
                  padding: '2rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(0,0,0,0.08)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)'
                }}
              >
                <div style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ color: '#1f2937', fontWeight: 700, marginBottom: '0.25rem' }}>Process Scheduling Notes</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Operating Systems • Sem 5</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.5rem' }}>Uploaded by Alex</div>
                </div>
                <div style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ color: '#1f2937', fontWeight: 700, marginBottom: '0.25rem' }}>Database Normalization</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>DBMS • AI Generated</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.5rem' }}>Generated in 12s</div>
                </div>
                <div style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '1.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
                }}>
                  <div style={{ color: '#1f2937', fontWeight: 700, marginBottom: '0.25rem' }}>Binary Trees Explained</div>
                  <div style={{ color: '#6b7280', fontSize: '0.875rem' }}>Data Structures • Sem 3</div>
                  <div style={{ color: '#9ca3af', fontSize: '0.8rem', marginTop: '0.5rem' }}>124 downloads</div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="section">
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">Why students love UniNotes</h2>
            <p className="section-subtitle">
              Everything you need to ace your exams, all in one place
            </p>
          </div>
          
          <Row className="g-4">
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">📤</div>
                <h3 className="feature-title">Share & Contribute</h3>
                <p className="feature-text">
                  Upload your study materials in PDF, DOC, or image format. 
                  Help your peers and build your reputation.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h3 className="feature-title">Smart Discovery</h3>
                <p className="feature-text">
                  Find exactly what you need with powerful filters. 
                  Search by subject, semester, or keywords.
                </p>
              </div>
            </Col>
            <Col md={4}>
              <div className="feature-card">
                <div className="feature-icon">✨</div>
                <h3 className="feature-title">AI Generation</h3>
                <p className="feature-text">
                  Generate comprehensive study notes on any topic 
                  instantly using advanced AI technology.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* How It Works */}
      <section style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '5rem 0' }}>
        <Container>
          <div className="text-center mb-5">
            <h2 className="section-title">How it works</h2>
            <p className="section-subtitle">
              Get started in three simple steps
            </p>
          </div>
          
          <Row className="g-4 align-items-center">
            <Col md={4} className="text-center">
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#3B82F6',
                  color: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}
              >
                1
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1f2937' }}>Create Account</h4>
              <p style={{ color: '#6b7280' }}>Sign up for free in seconds with just your email</p>
            </Col>
            <Col md={4} className="text-center">
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#3B82F6',
                  color: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}
              >
                2
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1f2937' }}>Upload or Browse</h4>
              <p style={{ color: '#6b7280' }}>Share your notes or discover materials from others</p>
            </Col>
            <Col md={4} className="text-center">
              <div 
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  background: '#3B82F6',
                  color: '#ffffff',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 8px 24px rgba(59, 130, 246, 0.3)'
                }}
              >
                3
              </div>
              <h4 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1f2937' }}>Ace Your Exams</h4>
              <p style={{ color: '#6b7280' }}>Study smarter with quality notes and AI assistance</p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section 
        className="cta-section" 
        style={{ 
          background: 'transparent',
          padding: '6rem 0' 
        }}
      >
        <Container className="text-center">
          <div 
            style={{
              background: '#ffffff',
              borderRadius: '24px',
              padding: '4rem 3rem',
              maxWidth: '700px',
              margin: '0 auto',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)'
            }}
          >
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1rem', color: '#1f2937' }}>
              Ready to transform your study experience?
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
              Join thousands of students already using UniNotes to study smarter
            </p>
            {!isAuthenticated ? (
              <Button 
                as={Link} 
                to="/signup" 
                variant="primary" 
                size="lg"
                style={{ borderRadius: '12px', padding: '1rem 2.5rem', fontWeight: 600 }}
              >
                Get Started — It's Free
              </Button>
            ) : (
              <Button 
                as={Link} 
                to="/dashboard" 
                variant="primary" 
                size="lg"
                style={{ borderRadius: '12px', padding: '1rem 2.5rem', fontWeight: 600 }}
              >
                Go to Dashboard
              </Button>
            )}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="modern-footer">
        <Container className="text-center">
          <p style={{ margin: 0 }}>© 2026 UniNotes. Built for students, by students.</p>
        </Container>
      </footer>
    </>
  )
}

export default HomePage
