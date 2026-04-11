import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import StatsCards from '../components/StatsCards';
import LeadTable from '../components/LeadTable';
import LeadDetailsModal from '../components/LeadDetailsModal';
import NotesModal from '../components/NotesModal';
import LeadFormModal from '../components/LeadFormModal';
import Pagination from '../components/Pagination';

const PAGE_SIZE = 10;

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortKey, setSortKey] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [notesLead, setNotesLead] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const response = await api.get('/leads');
      setLeads(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to load leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      new: leads.filter((lead) => lead.status === 'new').length,
      contacted: leads.filter((lead) => lead.status === 'contacted').length,
      converted: leads.filter((lead) => lead.status === 'converted').length,
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    const lowerSearch = search.trim().toLowerCase();

    return leads
      .filter((lead) => {
        const statusMatch = statusFilter === 'all' || lead.status === statusFilter;
        const searchMatch =
          !lowerSearch ||
          lead.name.toLowerCase().includes(lowerSearch) ||
          lead.email.toLowerCase().includes(lowerSearch);

        return statusMatch && searchMatch;
      })
      .sort((a, b) => {
        const first = String(a[sortKey]).toLowerCase();
        const second = String(b[sortKey]).toLowerCase();

        if (first < second) {
          return sortDirection === 'asc' ? -1 : 1;
        }
        if (first > second) {
          return sortDirection === 'asc' ? 1 : -1;
        }
        return 0;
      });
  }, [leads, search, statusFilter, sortKey, sortDirection]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / PAGE_SIZE));
  const visibleLeads = filteredLeads.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const updateLead = async (leadId, payload, successMessage = 'Lead updated') => {
    const response = await api.put(`/leads/${leadId}`, payload);
    setLeads((prev) => prev.map((lead) => (lead._id === leadId ? response.data : lead)));
    toast.success(successMessage);
  };

  const handleStatusChange = async (lead, status) => {
    try {
      await updateLead(lead._id, { ...lead, status }, 'Status updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleSaveNotes = async (notes) => {
    if (!notesLead) {
      return;
    }

    try {
      await updateLead(notesLead._id, { ...notesLead, notes }, 'Notes saved');
      setNotesLead(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save notes');
    }
  };

  const handleDelete = async (lead) => {
    const confirmed = window.confirm(`Delete lead ${lead.name}?`);
    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/leads/${lead._id}`);
      setLeads((prev) => prev.filter((item) => item._id !== lead._id));
      toast.success('Lead deleted');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    }
  };

  const handleCreateLead = async (payload) => {
    try {
      setCreating(true);
      const response = await api.post('/leads', payload);
      setLeads((prev) => [response.data, ...prev]);
      toast.success('Lead created');
      setShowCreateModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create lead');
    } finally {
      setCreating(false);
    }
  };

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
      return;
    }

    setSortKey(key);
    setSortDirection('asc');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return <LoadingSpinner fullScreen label="Loading dashboard..." />;
  }

  return (
    <main className="dashboard-page">
      <header className="dashboard-header fade-in">
        <div>
          <p className="eyebrow">Welcome back</p>
          <h1>Lead Management Dashboard</h1>
          <p className="subtle">Signed in as {admin?.email}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-primary ripple" onClick={() => setShowCreateModal(true)}>
            + New Lead
          </button>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <StatsCards stats={stats} />

      <section className="filters glass-card fade-in">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
      </section>

      <LeadTable
        leads={visibleLeads}
        sortKey={sortKey}
        sortDirection={sortDirection}
        onSort={handleSort}
        onStatusChange={handleStatusChange}
        onOpenDetails={setSelectedLead}
        onOpenNotes={setNotesLead}
        onDelete={handleDelete}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {selectedLead && <LeadDetailsModal lead={selectedLead} onClose={() => setSelectedLead(null)} />}
      {notesLead && (
        <NotesModal
          lead={notesLead}
          onSave={handleSaveNotes}
          onClose={() => setNotesLead(null)}
        />
      )}
      {showCreateModal && (
        <LeadFormModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateLead}
          creating={creating}
        />
      )}
    </main>
  );
};

export default DashboardPage;
