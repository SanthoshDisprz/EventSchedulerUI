import "../styles/AlertBox.scss";
//component for alertbox which will be showed upon creating, deleting and updating appointment
const AlertBox = ({ alertType, alertMessage }) => {
  return (
    <div className="alert-box">
      <div
        className={`alert-box ${
          alertType === "Success" ? `success` : `error`
        } alert`}
      >
        <div className="alert-icon">{alertType === "Success" ? "✓" : "✗"}</div>
        <div className="alert-message">{alertMessage}</div>
      </div>
    </div>
  );
};

export default AlertBox;
