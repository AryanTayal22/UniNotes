import { useState } from 'react'
import { Container, Form, Button, Alert, ProgressBar } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

function UploadPage() {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    semester: '',
    description: '',
    tags: ''
  })
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB')
        return
      }
      setFile(selectedFile)
      setError('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!file) {
      return setError('Please select a file to upload')
    }

    if (!formData.title || !formData.subject) {
      return setError('Title and subject are required')
    }

    setLoading(true)
    setUploadProgress(0)

    try {
      const data = new FormData()
      data.append('file', file)
      data.append('title', formData.title)
      data.append('subject', formData.subject)
      data.append('semester', formData.semester)
      data.append('description', formData.description)
      data.append('tags', formData.tags)

      await api.post('/notes', data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
          setUploadProgress(progress)
        }
      })

      setSuccess('Note uploaded successfully!')
      setTimeout(() => {
        navigate('/browse')
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Error uploading note')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)' }}>
      <Container className="py-5">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="text-center mb-4">
            <h2 style={{ fontWeight: 800, marginBottom: '0.5rem', color: '#1f2937' }}>Upload Notes</h2>
            <p style={{ color: '#6b7280' }}>Share your study materials with fellow students</p>
          </div>
          
          <div className="auth-card" style={{ maxWidth: '100%' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}
            
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label>Select File</Form.Label>
                <div 
                  style={{ 
                    border: '2px dashed rgba(0, 0, 0, 0.15)', 
                    borderRadius: '12px', 
                    padding: '2rem', 
                    textAlign: 'center',
                    background: 'white',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('fileInput').click()}
                >
                  <input 
                    type="file" 
                    id="fileInput"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif"
                    style={{ display: 'none' }}
                  />
                  {file ? (
                    <>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📄</div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#1f2937' }}>{file.name}</p>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </>
                  ) : (
                    <>
                      <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📤</div>
                      <p style={{ fontWeight: 600, marginBottom: '0.25rem', color: '#1f2937' }}>Click to upload</p>
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
                        PDF, DOC, DOCX, PPT, PPTX, Images (Max 10MB)
                      </p>
                    </>
                  )}
                </div>
              </Form.Group>

              {loading && uploadProgress > 0 && (
                <ProgressBar 
                  now={uploadProgress} 
                  label={`${uploadProgress}%`} 
                  className="mb-4"
                  style={{ height: '8px', borderRadius: '4px' }}
                />
              )}

              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Operating Systems Chapter 1 Notes"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Operating Systems"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Semester <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></Form.Label>
                <Form.Select
                  name="semester"
                  value={formData.semester}
                  onChange={handleChange}
                >
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Brief description of the notes..."
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Tags <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span></Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="e.g., exam, important, chapter1 (comma separated)"
                />
              </Form.Group>

              <Button 
                variant="dark" 
                type="submit" 
                className="w-100"
                disabled={loading}
                style={{ padding: '0.875rem', fontWeight: 600, borderRadius: '12px' }}
              >
                {loading ? 'Uploading...' : 'Upload Note →'}
              </Button>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default UploadPage
