import { useState } from 'react';

const NotesModal = ({ lead, onSave, onClose }) => {
  const [notes, setNotes] = useState(lead?.notes || '');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(notes);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <h2>Add Follow-up Notes</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            className="text-area"
            placeholder="Write your follow-up notes here..."
            rows={6}
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
          />
          <div className="modal-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit">
              Save Notes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotesModal;
