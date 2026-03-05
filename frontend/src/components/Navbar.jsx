import { Navbar as BsNavbar, Nav, Container, Button } from 'react-bootstrap'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    try {
      await logout()
      navigate('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const isActive = (path) => location.pathname === path

  return (
    <BsNavbar expand="lg" sticky="top" className="py-3">
      <Container>
        <BsNavbar.Brand as={Link} to="/" style={{ fontWeight: 800, fontSize: '1.5rem', color: '#1f2937' }}>
          UniNotes
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link 
              as={Link} 
              to="/" 
              style={{ fontWeight: isActive('/') ? 600 : 500, color: isActive('/') ? '#1f2937' : '#6b7280' }}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/browse"
              style={{ fontWeight: isActive('/browse') ? 600 : 500, color: isActive('/browse') ? '#1f2937' : '#6b7280' }}
            >
              Browse
            </Nav.Link>
            {isAuthenticated && (
              <>
                <Nav.Link 
                  as={Link} 
                  to="/upload"
                  style={{ fontWeight: isActive('/upload') ? 600 : 500, color: isActive('/upload') ? '#1f2937' : '#6b7280' }}
                >
                  Upload
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/ai-generator"
                  style={{ fontWeight: isActive('/ai-generator') ? 600 : 500, color: isActive('/ai-generator') ? '#1f2937' : '#6b7280' }}
                >
                  AI Generator
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/dashboard"
                  style={{ fontWeight: isActive('/dashboard') ? 600 : 500, color: isActive('/dashboard') ? '#1f2937' : '#6b7280' }}
                >
                  Dashboard
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isAuthenticated ? (
              <div className="d-flex align-items-center gap-3">
                <span style={{ color: '#6b7280', fontSize: '0.9rem' }} className="d-none d-lg-inline">
                  {user?.name}
                </span>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={handleLogout}
                  style={{ borderRadius: '8px', fontWeight: 600 }}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Button 
                  as={Link} 
                  to="/login" 
                  variant="outline-primary"
                  size="sm"
                  style={{ borderRadius: '8px', fontWeight: 600 }}
                >
                  Sign In
                </Button>
                <Button 
                  as={Link} 
                  to="/signup" 
                  variant="primary"
                  size="sm"
                  style={{ borderRadius: '8px', fontWeight: 600 }}
                >
                  Get Started
                </Button>
              </div>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}

export default Navbar
