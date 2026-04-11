const statsConfig = [
  { key: 'total', label: 'Total Leads' },
  { key: 'new', label: 'New Leads' },
  { key: 'contacted', label: 'Contacted Leads' },
  { key: 'converted', label: 'Converted Leads' },
];

const StatsCards = ({ stats }) => {
  return (
    <section className="stats-grid">
      {statsConfig.map((item) => (
        <article className="glass-card stat-card fade-in" key={item.key}>
          <p className="stat-label">{item.label}</p>
          <h3>{stats[item.key]}</h3>
        </article>
      ))}
    </section>
  );
};

export default StatsCards;
