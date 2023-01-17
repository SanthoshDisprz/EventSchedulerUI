import "../styles/ViewToggleButton.scss";
//under-development - view toggle button which will toggle to multiple views like timeline view, agenda view
const ViewToggleButton = ({
  canShowListView,
  toggleListView,
  toggleTimelineView,
}) => {
  return (
    <div className="view-toggle-button">
      <div
        className={`timeline-view-button ${!canShowListView && `active`}`}
        onClick={toggleTimelineView}
      >
        Day
      </div>
      <div
        className={`list-view-button ${canShowListView && `active`}`}
        onClick={toggleListView}
      >
        Month
      </div>
    </div>
  );
};

export default ViewToggleButton;
