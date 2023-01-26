import "../../styles/StatBox.scss";
//stat box for insights data
const StatBox = ({ icon, title, data }) => {
  return (
    <div className={`stat-box-${title.toLowerCase()}`}>
      <div className="icon-container">
        <img src={icon} className="icon" />
      </div>
      <div className="data-container">
        <div className="data-title">{title}</div>
        <div className="data">{data}</div>
      </div>
    </div>
  );
};

export default StatBox;
