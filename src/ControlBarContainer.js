import ControlBar from "./ControlBar";
import {connect} from "react-redux";
import {ChangePage, changePagination, DeleteItemRequest, SearchAndFilter, SetModal} from "./actions";


const mapStateToProps = (state) => {
    return {
        state: state
    }
}

const mapDispatchToProps = {
    changePagination: changePagination,
    changePage: ChangePage,
    SearchAndFilter: SearchAndFilter,
    setModal: SetModal
}

const ControlBarContainer = connect(mapStateToProps, mapDispatchToProps)(ControlBar)
export default ControlBarContainer;
