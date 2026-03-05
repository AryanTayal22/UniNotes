import { Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function NoteCard({ note }) {
  return (
    <div 
      style={{ 
        background: '#ffffff', 
        borderRadius: '12px', 
        border: '1px solid rgba(0, 0, 0, 0.08)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease',
        cursor: 'pointer',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
      }}
      className="note-card-hover"
    >
      {/* Card Header with Title */}
      <div style={{ padding: '1.25rem 1.25rem 0.75rem', textAlign: 'center' }}>
        <h5 style={{ 
          fontWeight: 700, 
          fontSize: '1.15rem', 
          marginBottom: '0.5rem',
          color: '#1f2937',
          lineHeight: 1.4
        }}>
          {note.title}
        </h5>
        <div style={{ color: '#6b7280', fontWeight: 600, fontSize: '0.85rem' }}>
          {note.subject}
        </div>
      </div>
      
      {/* Card Body */}
      <div style={{ padding: '0 1.25rem', flexGrow: 1, textAlign: 'left' }}>
        {note.semester && (
          <div style={{ 
            color: '#9ca3af', 
            fontSize: '0.8rem',
            marginBottom: '0.5rem'
          }}>
            Semester {note.semester}
          </div>
        )}
        
        {note.description && (
          <p style={{ 
            color: '#6b7280', 
            fontSize: '0.85rem', 
            lineHeight: 1.5,
            marginBottom: '0.75rem'
          }}>
            {note.description.length > 60 
              ? `${note.description.substring(0, 60)}...` 
              : note.description}
          </p>
        )}
        
        {note.tags && note.tags.length > 0 && (
          <div style={{ marginBottom: '0.75rem' }}>
            {note.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                style={{ 
                  background: 'rgba(59, 130, 246, 0.1)', 
                  color: '#3B82F6', 
                  fontWeight: 500,
                  marginRight: '0.5rem',
                  fontSize: '0.75rem',
                  padding: '0.25rem 0.6rem',
                  borderRadius: '4px',
                  display: 'inline-block',
                  marginBottom: '0.25rem'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      
      {/* Card Footer */}
      <div 
        style={{ 
          padding: '0.75rem 1.25rem', 
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 'auto'
        }}
      >
        <span style={{ color: '#9ca3af', fontSize: '0.8rem' }}>
          {note.uploadedBy?.name || 'Anonymous'}
        </span>
        <Button 
          as={Link} 
          to={`/notes/${note._id}`}
          variant="primary" 
          size="sm"
          style={{ borderRadius: '6px', fontWeight: 600, fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}
        >
          View
        </Button>
      </div>
    </div>
  )
}

export default NoteCard
