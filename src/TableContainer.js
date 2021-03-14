import {connect} from "react-redux";
import Table from "./Table";
import {ChooseItem, DeleteItemRequest, fetchData, filterTable, SetModal} from "./actions";

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

const mapDispatchToProps = {
    fetchData: fetchData,
    filterTable: filterTable,
    chooseItems: ChooseItem,
    setModal: SetModal,
    deleteItems: DeleteItemRequest
}

const TableContainer = connect(mapStateToProps, mapDispatchToProps)(Table);
export default TableContainer;
