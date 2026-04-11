import { useState } from 'react';

const initialData = {
  name: '',
  email: '',
  phone: '',
  source: 'Website',
  status: 'new',
  notes: '',
};

const LeadFormModal = ({ onClose, onCreate, creating }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (event) => {
    setFormData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(event) => event.stopPropagation()}>
        <h2>Add New Lead</h2>
        <form onSubmit={handleSubmit} className="form-grid">
          <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
          <select name="source" value={formData.source} onChange={handleChange}>
            <option value="Website">Website</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Referral">Referral</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="notes"
            className="text-area"
            placeholder="Initial notes"
            rows={4}
            value={formData.notes}
            onChange={handleChange}
          />
          <div className="modal-actions">
            <button className="btn btn-secondary" type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-primary" type="submit" disabled={creating}>
              {creating ? 'Saving...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeadFormModal;
