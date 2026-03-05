import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, Spinner, Alert, ListGroup } from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'
import api from '../services/api'

function AIGeneratorPage() {
  const [topic, setTopic] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [history, setHistory] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await api.get('/ai/notes')
      setHistory(response.data.aiNotes)
    } catch (err) {
      console.error('Error fetching history:', err)
    } finally {
      setLoadingHistory(false)
    }
  }

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setGeneratedContent('')

    if (!topic.trim()) {
      return setError('Please enter a topic')
    }

    setLoading(true)

    try {
      const response = await api.post('/ai/generate', { topic })
      setGeneratedContent(response.data.aiNote.generatedContent)
      setHistory([response.data.aiNote, ...history])
      setTopic('')
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error generating notes'
      if (errorMsg.includes('quota') || errorMsg.includes('429')) {
        setError('AI service is temporarily unavailable. Please try again later or contact support.')
      } else {
        setError(errorMsg)
      }
    } finally {
      setLoading(false)
    }
  }

  const handleHistoryClick = (aiNote) => {
    setGeneratedContent(aiNote.generatedContent)
    setTopic('')
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    alert('Copied to clipboard!')
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Container fluid className="py-5">
        <Row>
          {/* Main Content */}
          <Col lg={8}>
            <div className="mb-4" style={{ paddingTop: '0.5rem' }}>
              <h2 style={{ fontWeight: 800, marginBottom: '0.25rem', color: '#1f2937' }}>AI Notes Generator</h2>
              <p style={{ color: '#6b7280' }}>Generate comprehensive study notes on any topic</p>
            </div>
            
            {error && <Alert variant="danger">{error}</Alert>}
            
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                padding: '2rem',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                marginBottom: '1.5rem',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
              }}
            >
              <Form onSubmit={handleGenerate}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: 600, color: '#1f2937' }}>What topic would you like notes on?</Form.Label>
                  <Form.Control
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., Operating System Scheduling Algorithms"
                    disabled={loading}
                    maxLength={200}
                    style={{ 
                      fontSize: '1rem', 
                      padding: '1rem',
                      background: '#f9fafb',
                      border: '1px solid rgba(0, 0, 0, 0.08)',
                      color: '#1f2937'
                    }}
                  />
                  <Form.Text style={{ color: '#9ca3af' }}>
                    Be specific for better results. Max 200 characters.
                  </Form.Text>
                </Form.Group>
                
                <Button 
                  variant="primary" 
                  type="submit" 
                  disabled={loading || !topic.trim()}
                  className="w-100"
                  style={{ borderRadius: '12px', padding: '1rem', fontWeight: 600 }}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Generating... (this may take a moment)
                    </>
                  ) : (
                    'Generate Notes'
                  )}
                </Button>
              </Form>
            </div>

            {/* Generated Content */}
            {generatedContent && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <div
                  style={{ 
                    padding: '1rem 1.5rem', 
                    borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <h5 style={{ fontWeight: 700, margin: 0, color: '#1f2937' }}>Generated Notes</h5>
                  <Button 
                    variant="outline-primary" 
                    size="sm" 
                    onClick={handleCopy}
                    style={{ borderRadius: '8px' }}
                  >
                    📋 Copy
                  </Button>
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div className="generated-content">
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                </div>
              </div>
            )}

            {loading && (
              <div 
                style={{ 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  padding: '4rem 2rem',
                  border: '1px solid rgba(0, 0, 0, 0.08)',
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
                }}
              >
                <Spinner animation="border" style={{ color: '#3B82F6' }} className="mb-3" />
                <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#1f2937' }}>AI is generating your study notes...</p>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>This usually takes 10-30 seconds</p>
              </div>
            )}
          </Col>

          {/* History Sidebar */}
          <Col lg={4}>
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '16px', 
                border: '1px solid rgba(0, 0, 0, 0.08)',
                overflow: 'hidden',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
              }}
            >
              <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(0, 0, 0, 0.08)' }}>
                <h5 style={{ fontWeight: 700, margin: 0, color: '#1f2937' }}>Recent Generations</h5>
              </div>
              <div style={{ maxHeight: '500px', overflowY: 'auto', padding: '0.5rem' }}>
                {loadingHistory ? (
                  <div className="text-center py-4">
                    <Spinner animation="border" size="sm" style={{ color: '#3B82F6' }} />
                  </div>
                ) : history.length === 0 ? (
                  <p style={{ color: '#9ca3af', textAlign: 'center', padding: '2rem' }}>No history yet</p>
                ) : (
                  history.map((aiNote) => (
                    <div 
                      key={aiNote._id}
                      onClick={() => handleHistoryClick(aiNote)}
                      style={{ 
                        padding: '1rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        marginBottom: '0.5rem',
                        transition: 'background 0.2s'
                      }}
                      onMouseEnter={(e) => e.target.style.background = 'rgba(59, 130, 246, 0.05)'}
                      onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <div style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#1f2937' }}>{aiNote.topic}</div>
                      <small style={{ color: '#9ca3af' }}>
                        {new Date(aiNote.createdAt).toLocaleDateString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AIGeneratorPage
