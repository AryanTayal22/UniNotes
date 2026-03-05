import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap'
import NoteCard from '../components/NoteCard'
import api from '../services/api'

function BrowsePage() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    search: '',
    subject: '',
    semester: ''
  })
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async (page = 1) => {
    setLoading(true)
    setError('')
    
    try {
      const params = new URLSearchParams()
      params.append('page', page)
      
      if (filters.search) params.append('search', filters.search)
      if (filters.subject) params.append('subject', filters.subject)
      if (filters.semester) params.append('semester', filters.semester)

      const response = await api.get(`/notes?${params.toString()}`)
      
      setNotes(response.data.notes)
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        total: response.data.total
      })
    } catch (err) {
      setError('Error fetching notes')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    fetchNotes(1)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      subject: '',
      semester: ''
    })
    fetchNotes(1)
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Container fluid className="py-5">
        {/* Centered Heading */}
        <div className="text-center mb-5">
          <h1 style={{ fontWeight: 800, fontSize: '2.5rem', marginBottom: '0.5rem', color: '#1f2937' }}>Browse Notes</h1>
          <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>{pagination.total} notes available</p>
        </div>
        <Row>
          {/* Sidebar Filters */}
          <Col md={3} lg={2} className="mb-4">
            <div className="filter-sidebar">
              <h5 style={{ fontWeight: 700, marginBottom: '1.5rem' }}>Filters</h5>
              <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                  <Form.Label>Search</Form.Label>
                  <Form.Control
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    placeholder="Search notes..."
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={filters.subject}
                    onChange={handleFilterChange}
                    placeholder="e.g., OS, DBMS"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Semester</Form.Label>
                  <Form.Select
                    name="semester"
                    value={filters.semester}
                    onChange={handleFilterChange}
                  >
                    <option value="">All Semesters</option>
                    {[1,2,3,4,5,6,7,8].map(sem => (
                      <option key={sem} value={sem}>Semester {sem}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="dark" 
                    type="submit"
                    style={{ borderRadius: '10px', fontWeight: 600 }}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline-secondary" 
                    onClick={clearFilters}
                    style={{ borderRadius: '10px' }}
                  >
                    Clear All
                  </Button>
                </div>
              </Form>
            </div>
          </Col>

          {/* Notes Grid */}
          <Col md={9} lg={10}>
            {error && <Alert variant="danger">{error}</Alert>}

            {loading ? (
              <div className="spinner-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : notes.length === 0 ? (
              <div 
                style={{ 
                  background: '#fff', 
                  borderRadius: '16px', 
                  padding: '3rem', 
                  textAlign: 'center',
                  border: '1px solid #e5e7eb'
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📚</div>
                <h5 style={{ fontWeight: 700 }}>No notes found</h5>
                <p style={{ color: '#6b7280' }}>Try adjusting your filters or be the first to upload!</p>
              </div>
            ) : (
              <>
                <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                  {notes.map(note => (
                    <Col key={note._id}>
                      <NoteCard note={note} />
                    </Col>
                  ))}
                </Row>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-5 gap-2">
                    <Button
                      variant="outline-dark"
                      disabled={pagination.currentPage === 1}
                      onClick={() => fetchNotes(pagination.currentPage - 1)}
                      style={{ borderRadius: '10px' }}
                    >
                      ← Previous
                    </Button>
                    <span 
                      className="d-flex align-items-center px-4"
                      style={{ fontWeight: 600 }}
                    >
                      {pagination.currentPage} / {pagination.totalPages}
                    </span>
                    <Button
                      variant="outline-dark"
                      disabled={pagination.currentPage === pagination.totalPages}
                      onClick={() => fetchNotes(pagination.currentPage + 1)}
                      style={{ borderRadius: '10px' }}
                    >
                      Next →
                    </Button>
                  </div>
                )}
              </>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default BrowsePage
