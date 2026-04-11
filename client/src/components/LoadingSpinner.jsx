const LoadingSpinner = ({ fullScreen = false, label = 'Loading...' }) => {
  return (
    <div className={`loading-wrap ${fullScreen ? 'full' : ''}`}>
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
};

export default LoadingSpinner;
