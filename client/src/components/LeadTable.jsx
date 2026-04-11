const LeadTable = ({ leads, sortKey, sortDirection, onSort, onStatusChange, onOpenDetails, onOpenNotes, onDelete }) => {
  const renderSortArrow = (column) => {
    if (sortKey !== column) {
      return '↕';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  if (!leads.length) {
    return (
      <div className="glass-card empty-state fade-in">
        <h3>No leads found</h3>
        <p>Try changing filters or add a new lead to get started.</p>
      </div>
    );
  }

  return (
    <div className="table-wrap glass-card fade-in">
      <table>
        <thead>
          <tr>
            <th onClick={() => onSort('name')}>Name {renderSortArrow('name')}</th>
            <th onClick={() => onSort('email')}>Email {renderSortArrow('email')}</th>
            <th>Source</th>
            <th>Status</th>
            <th onClick={() => onSort('createdAt')}>Created {renderSortArrow('createdAt')}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id}>
              <td>{lead.name}</td>
              <td>{lead.email}</td>
              <td>{lead.source}</td>
              <td>
                <div className="status-wrap">
                  <span className={`status-badge ${lead.status}`}>{lead.status}</span>
                  <select
                    value={lead.status}
                    onChange={(event) => onStatusChange(lead, event.target.value)}
                  >
                    <option value="new">new</option>
                    <option value="contacted">contacted</option>
                    <option value="converted">converted</option>
                  </select>
                </div>
              </td>
              <td>{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td>
                <div className="actions">
                  <button className="btn btn-secondary" onClick={() => onOpenDetails(lead)}>
                    View
                  </button>
                  <button className="btn btn-secondary" onClick={() => onOpenNotes(lead)}>
                    Notes
                  </button>
                  <button className="btn btn-danger" onClick={() => onDelete(lead)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;
