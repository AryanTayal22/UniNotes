import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Tab, Tabs, Spinner, Alert, Button, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import NoteCard from '../components/NoteCard'
import api from '../services/api'

function DashboardPage() {
  const { user } = useAuth()
  const [uploadedNotes, setUploadedNotes] = useState([])
  const [aiNotes, setAiNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    setError('')

    try {
      const [notesRes, aiRes] = await Promise.all([
        api.get('/notes/user/me'),
        api.get('/ai/notes')
      ])

      setUploadedNotes(notesRes.data.notes)
      setAiNotes(aiRes.data.aiNotes)
    } catch (err) {
      setError('Error loading dashboard data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${noteId}`)
      setUploadedNotes(uploadedNotes.filter(n => n._id !== noteId))
    } catch (err) {
      alert('Error deleting note')
    }
  }

  const handleDeleteAiNote = async (aiNoteId) => {
    if (!window.confirm('Are you sure you want to delete this AI note?')) return

    try {
      await api.delete(`/ai/notes/${aiNoteId}`)
      setAiNotes(aiNotes.filter(n => n._id !== aiNoteId))
    } catch (err) {
      alert('Error deleting AI note')
    }
  }

  if (loading) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Container className="spinner-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Container className="py-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <div>
            <h2 style={{ fontWeight: 800, marginBottom: '0.25rem', color: '#1f2937' }}>Dashboard</h2>
            <p style={{ color: '#6b7280', margin: 0 }}>Welcome back, {user?.name}!</p>
          </div>
          <div className="d-flex gap-2">
            <Button 
              as={Link} 
              to="/upload" 
              variant="primary"
              style={{ borderRadius: '10px', fontWeight: 600 }}
            >
              Upload Notes
            </Button>
            <Button 
              as={Link} 
              to="/ai-generator" 
              variant="outline-primary"
              style={{ borderRadius: '10px', fontWeight: 600 }}
            >
              AI Generator
            </Button>
          </div>
        </div>

        {/* Stats */}
        <Row className="mb-5 g-4">
          <Col md={4}>
            <div className="stat-card">
              <div className="stat-number">{uploadedNotes.length}</div>
              <div className="stat-label">Notes Uploaded</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card">
              <div className="stat-number">{aiNotes.length}</div>
              <div className="stat-label">AI Notes Generated</div>
            </div>
          </Col>
          <Col md={4}>
            <div className="stat-card">
              <div className="stat-number">{uploadedNotes.reduce((sum, n) => sum + (n.downloadCount || 0), 0)}</div>
              <div className="stat-label">Total Downloads</div>
            </div>
          </Col>
        </Row>

        {error && <Alert variant="danger">{error}</Alert>}

        <Tabs defaultActiveKey="uploaded" className="mb-4">
          {/* Uploaded Notes Tab */}
          <Tab eventKey="uploaded" title={`My Uploads (${uploadedNotes.length})`}>
            {uploadedNotes.length === 0 ? (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📤</div>
                <h5 style={{ fontWeight: 700, color: '#1f2937' }}>No uploaded notes yet</h5>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Start sharing your study materials!</p>
                <Button 
                  as={Link} 
                  to="/upload" 
                  variant="primary"
                  style={{ borderRadius: '10px', fontWeight: 600 }}
                >
                  Upload Your First Note
                </Button>
              </div>
            ) : (
              <Row xs={1} md={2} lg={3} className="g-4">
                {uploadedNotes.map(note => (
                  <Col key={note._id}>
                    <div 
                      style={{ 
                        background: '#ffffff', 
                        borderRadius: '12px', 
                        border: '1px solid rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <div style={{ padding: '1.5rem' }}>
                        <h6 style={{ fontWeight: 700, marginBottom: '0.5rem', color: '#1f2937' }}>{note.title}</h6>
                        <p style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>{note.subject}</p>
                        <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>
                          {note.downloadCount || 0} downloads
                        </p>
                      </div>
                      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(0, 0, 0, 0.08)', display: 'flex', gap: '0.5rem' }}>
                        <Button 
                          as={Link} 
                          to={`/notes/${note._id}`} 
                          variant="primary" 
                          size="sm"
                          style={{ borderRadius: '8px', fontWeight: 600 }}
                        >
                          View
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDeleteNote(note._id)}
                          style={{ borderRadius: '8px' }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            )}
          </Tab>

          {/* AI Generated Notes Tab */}
          <Tab eventKey="ai" title={`AI Notes (${aiNotes.length})`}>
            {aiNotes.length === 0 ? (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '4rem 2rem',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
                <h5 style={{ fontWeight: 700, color: '#1f2937' }}>No AI generated notes yet</h5>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Try our AI-powered note generator!</p>
                <Button 
                  as={Link} 
                  to="/ai-generator" 
                  variant="primary"
                  style={{ borderRadius: '10px', fontWeight: 600 }}
                >
                  Generate Notes with AI
                </Button>
              </div>
            ) : (
              <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid rgba(0, 0, 0, 0.08)', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)' }}>
                {aiNotes.map((aiNote, index) => (
                  <div 
                    key={aiNote._id}
                    style={{ 
                      padding: '1.25rem 1.5rem',
                      borderBottom: index < aiNotes.length - 1 ? '1px solid rgba(0, 0, 0, 0.08)' : 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#1f2937' }}>{aiNote.topic}</div>
                      <small style={{ color: '#9ca3af' }}>
                        Generated on {new Date(aiNote.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                    <div className="d-flex gap-2">
                      <Button 
                        as={Link}
                        to="/ai-generator"
                        variant="primary" 
                        size="sm"
                        style={{ borderRadius: '8px', fontWeight: 600 }}
                      >
                        View
                      </Button>
                      <Button 
                        variant="outline-danger" 
                        size="sm"
                        onClick={() => handleDeleteAiNote(aiNote._id)}
                        style={{ borderRadius: '8px' }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Tab>
        </Tabs>
      </Container>
    </div>
  )
}

export default DashboardPage
