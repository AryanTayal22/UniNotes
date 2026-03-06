import { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import api from '../services/api'

function NoteDetailsPage() {
  const { id } = useParams()
  const [note, setNote] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [downloading, setDownloading] = useState(false)
  const [aiSummary, setAiSummary] = useState(null)
  const [loadingSummary, setLoadingSummary] = useState(false)

  useEffect(() => {
    fetchNote()
  }, [id])

  const fetchNote = async () => {
    try {
      const response = await api.get(`/notes/${id}`)
      setNote(response.data.note)
      // Fetch AI summary after getting note
      fetchAiSummary(response.data.note)
    } catch (err) {
      setError('Note not found')
    } finally {
      setLoading(false)
    }
  }

  const fetchAiSummary = async (noteData) => {
    // Check if note already has a cached summary
    if (noteData.aiSummary) {
      setAiSummary(noteData.aiSummary)
      return
    }
    
    setLoadingSummary(true)
    try {
      const response = await api.post(`/ai/summarize/${noteData._id}`)
      setAiSummary(response.data.summary)
    } catch (err) {
      console.error('Failed to generate AI summary:', err)
      // Don't show error to user, just fail silently
    } finally {
      setLoadingSummary(false)
    }
  }

  const handleDownload = async () => {
    setDownloading(true)
    try {
      const response = await api.get(`/notes/${id}/download`)
      const fileUrl = response.data.fileUrl
      
      // Simply open the file URL in a new tab
      window.open(fileUrl, '_blank')
    } catch (err) {
      setError('Error downloading note')
    } finally {
      setDownloading(false)
    }
  }

  const getFileTypeIcon = (fileType) => {
    if (fileType?.includes('pdf')) return '📄'
    if (fileType?.includes('word') || fileType?.includes('doc')) return '📝'
    if (fileType?.includes('presentation') || fileType?.includes('ppt')) return '📊'
    if (fileType?.includes('image')) return '🖼️'
    return '📁'
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

  if (error || !note) {
    return (
      <div style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Container className="py-5">
          <Alert variant="danger">{error || 'Note not found'}</Alert>
          <Link to="/browse">
            <Button variant="dark" style={{ borderRadius: '10px', fontWeight: 600 }}>Back to Browse</Button>
          </Link>
        </Container>
      </div>
    )
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Container className="py-5">
        <Link 
          to="/browse" 
          style={{ 
            textDecoration: 'none', 
            color: '#6b7280', 
            fontWeight: 500,
            display: 'inline-block',
            marginBottom: '1.5rem'
          }}
        >
          ← Back to Browse
        </Link>

        <Row>
          <Col lg={8}>
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '2rem',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div className="d-flex align-items-start gap-3 mb-4">
                <span style={{ fontSize: '3rem' }}>{getFileTypeIcon(note.fileType)}</span>
                <div>
                  <h2 style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#1f2937' }}>{note.title}</h2>
                  <span style={{ color: '#6b7280', fontWeight: 600 }}>{note.subject}</span>
                </div>
              </div>

              {note.description && (
                <div className="mb-4">
                  <h6 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1f2937' }}>Description</h6>
                  <p style={{ color: '#6b7280' }}>{note.description}</p>
                </div>
              )}

              {note.tags && note.tags.length > 0 && (
                <div className="mb-4">
                  <h6 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#ffffff' }}>Tags</h6>
                  {note.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      style={{ 
                        background: 'rgba(59, 130, 246, 0.1)', 
                        color: '#3B82F6',
                        marginRight: '0.5rem',
                        marginBottom: '0.5rem',
                        fontWeight: 500
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* AI Summary Section */}
              <div className="mb-4">
                <h6 style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#1f2937' }}>
                  ✨ AI Summary
                </h6>
                {loadingSummary ? (
                  <div 
                    style={{ 
                      background: 'rgba(59, 130, 246, 0.05)', 
                      borderRadius: '12px', 
                      padding: '2rem',
                      textAlign: 'center',
                      border: '1px solid rgba(59, 130, 246, 0.1)'
                    }}
                  >
                    <Spinner animation="border" size="sm" style={{ color: '#3B82F6' }} className="mb-2" />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.9rem' }}>
                      Generating AI summary...
                    </p>
                  </div>
                ) : aiSummary ? (
                  <div 
                    style={{ 
                      background: 'rgba(59, 130, 246, 0.05)', 
                      borderRadius: '12px', 
                      padding: '1.5rem',
                      border: '1px solid rgba(59, 130, 246, 0.1)'
                    }}
                  >
                    <div className="generated-content" style={{ color: '#1f2937' }}>
                      <ReactMarkdown>{aiSummary}</ReactMarkdown>
                    </div>
                  </div>
                ) : (
                  <div 
                    style={{ 
                      background: 'rgba(0, 0, 0, 0.03)', 
                      borderRadius: '12px', 
                      padding: '2rem',
                      textAlign: 'center',
                      border: '1px solid rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <p style={{ color: '#9ca3af', margin: 0, fontSize: '0.9rem' }}>
                      AI summary unavailable
                    </p>
                  </div>
                )}
              </div>

              {/* File Info */}
              <div 
                style={{ 
                  background: 'rgba(0, 0, 0, 0.03)', 
                  borderRadius: '12px', 
                  padding: '1.5rem',
                  textAlign: 'center',
                  border: '1px solid rgba(0, 0, 0, 0.08)'
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>📄</span>
                <h6 style={{ fontWeight: 700, marginTop: '0.75rem', color: '#1f2937' }}>{note.fileName || 'Document'}</h6>
                <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>Click Download to view the full document</p>
              </div>
            </div>
          </Col>

          <Col lg={4}>
            <div 
              className="sticky-top" 
              style={{ 
                top: '6rem',
                background: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid rgba(0, 0, 0, 0.08)',
                padding: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                zIndex: 10
              }}
            >
              <h5 style={{ fontWeight: 700, marginBottom: '1.5rem', color: '#1f2937' }}>Details</h5>
              
              <div className="mb-3">
                <small style={{ color: '#9ca3af', fontWeight: 500 }}>Uploaded By</small>
                <p style={{ fontWeight: 600, margin: 0, color: '#1f2937' }}>{note.uploadedBy?.name || 'Unknown'}</p>
              </div>

              {note.uploadedBy?.university && (
                <div className="mb-3">
                  <small style={{ color: '#9ca3af', fontWeight: 500 }}>University</small>
                  <p style={{ margin: 0, color: '#6b7280' }}>{note.uploadedBy.university}</p>
                </div>
              )}

              {note.semester && (
                <div className="mb-3">
                  <small style={{ color: '#9ca3af', fontWeight: 500 }}>Semester</small>
                  <p style={{ margin: 0, color: '#6b7280' }}>Semester {note.semester}</p>
                </div>
              )}

              <div className="mb-3">
                <small style={{ color: '#9ca3af', fontWeight: 500 }}>File Type</small>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#6b7280' }}>{note.fileName || 'Unknown'}</p>
              </div>

              <div className="mb-3">
                <small style={{ color: '#9ca3af', fontWeight: 500 }}>Downloads</small>
                <p style={{ margin: 0, fontWeight: 600, color: '#1f2937' }}>{note.downloadCount || 0}</p>
              </div>

              <div className="mb-4">
                <small style={{ color: '#9ca3af', fontWeight: 500 }}>Uploaded</small>
                <p style={{ margin: 0, color: '#6b7280' }}>{new Date(note.createdAt).toLocaleDateString()}</p>
              </div>

              <Button 
                variant="primary" 
                size="lg" 
                className="w-100"
                onClick={handleDownload}
                disabled={downloading}
                style={{ borderRadius: '12px', fontWeight: 600 }}
              >
                {downloading ? 'Opening...' : 'Download'}
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default NoteDetailsPage
