const LeadDetailsModal = ({ lead, onClose }) => {
  if (!lead) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <h2>Lead Details</h2>
        <div className="details-grid">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Email:</strong> {lead.email}</p>
          <p><strong>Phone:</strong> {lead.phone || '-'}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Created:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
          <p className="notes-line"><strong>Notes:</strong> {lead.notes || 'No notes yet'}</p>
        </div>
        <button className="btn btn-primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
