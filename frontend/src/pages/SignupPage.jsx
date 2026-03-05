import { useState } from 'react'
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    university: '',
    branch: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        university: formData.university,
        branch: formData.branch
      })
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center' }}>
      <Container className="d-flex justify-content-center py-5">
        <div className="auth-card" style={{ maxWidth: '480px' }}>
          <h2 className="auth-title">Create your account</h2>
          <p className="auth-subtitle">Start sharing and discovering study notes</p>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Full name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="name@example.com"
              />
            </Form.Group>

            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Min 6 characters"
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label>Confirm</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm password"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="university">
              <Form.Label>University <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></Form.Label>
              <Form.Control
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="Your university"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="branch">
              <Form.Label>Branch / Major <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></Form.Label>
              <Form.Control
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
            </Form.Group>

            <Button 
              variant="dark" 
              type="submit" 
              className="w-100 mb-3"
              disabled={loading}
              style={{ padding: '0.875rem', fontWeight: 600, borderRadius: '12px' }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </Form>

          <div className="text-center" style={{ color: '#6b7280' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#000', fontWeight: 600, textDecoration: 'none' }}>
              Sign in
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default SignupPage
