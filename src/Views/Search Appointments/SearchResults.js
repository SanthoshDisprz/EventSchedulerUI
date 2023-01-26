import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { MdOutlineClose } from "react-icons/md";
import "../../styles/SearchResults.scss";
import Appointment from "../../components/Appointment";
import NoResultsFoundImage from "../../assets/NoResultsFound.jpg"
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
const SearchResults = ({ appointments, handlePageNumber, handleSearchResults, handleAppointmentDetails, currentPage }) => {
    return (
        <div className="search-results">
            <div className="search-results-header">Search Results
                <MdOutlineClose className="close-search-icon" onClick={() => handleSearchResults(false)} title="Close" /></div>
            <div className="search-results-container">
                <div className="search-results-appointments">
                    {appointments.appointments.length > 0 ?
                        appointments.appointments.map((appointment) => (
                            <div onClick={() => { handleAppointmentDetails(appointment) }}>
                                <Appointment
                                    id={appointment.id}
                                    title={appointment.title}
                                    startTime={appointment.startTime}
                                    endTime={appointment.endTime}
                                    handleAppointmentDetails={handleAppointmentDetails}
                                />
                            </div>
                        )) : <><img src={NoResultsFoundImage} /><span className="no-results-found">No Results Found</span></>}
                </div>
                {appointments.totalPages > 0 && <div className="search-results-footer">
                    <RxChevronLeft onClick={() => currentPage > 1 && handlePageNumber("previousPage")} className={`previous-page ${(appointments.currentPage > 1) ? "" : "block-action"}`} title="Previous page" />
                    <div className="current-page">{currentPage}</div>
                    {<RxChevronRight onClick={() => currentPage < appointments.totalPages && handlePageNumber("nextPage")} className={`next-page ${(appointments.currentPage < appointments.totalPages) ? "" : "block-action"}`} title="Next page" />}
                </div>}
            </div>
        </div>
    );
};

export default SearchResults;
