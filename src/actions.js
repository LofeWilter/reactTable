import {deleteProducts, getProducts} from "./serverEmulation/request";
import {batch} from "react-redux";

const GET_STATE = 'GET_STATE';
const LOADING_FAIL = 'LOADING_FAIL';
const CHANGE_PAGINATION = 'CHANGE_PAGINATION';
const CHANGE_PAGE = 'CHANGE_PAGE';
const SEARCH_PRODUCT = 'SEARCH_PRODUCT';
const FILTER_TABLE = 'FILTER_TABLE';
const CHOOSE_ITEM = 'CHOOSE_ITEM';
const SET_MODAL = 'SET_MODAL';
const SUCCESSFUL_DELETE = 'SUCCESSFUL_DELETE';
const FAILED_DELETE = 'FAILED_DELETE';
const LOADING = 'LOADING';
const DESTROY_RESPONSE = 'DESTROY_RESPONSE';

export const ChangePage = (page) => {
    return {
        type: CHANGE_PAGE,
        newPage: page
    }
}

export const getState = (data) => {
    return {
        type: GET_STATE,
        data: data
    }
}

export const loadingFailed = () => {
    return {
        type: LOADING_FAIL
    }
}

export const changePagination = (number) => {
    return {
        type: CHANGE_PAGINATION,
        newValue: number
    }
}

export const fetchData = () => {
    return function (dispatch) {
        getProducts().then(
            res => dispatch(getState(res)),
            err => dispatch(loadingFailed())
        )
    }
}

export const searchByName = (name) => {
    return {
        type: SEARCH_PRODUCT,
        name: name
    }
}

export const SearchAndFilter = (name, filter, withSearch) => {
    return dispatch => {
        batch(() => {
            dispatch(searchByName(name))
            dispatch(filterTable(filter, withSearch))
        })
    }

}

export const filterTable = (filter, withSearch) => {
    return {
        type: FILTER_TABLE,
        filter: filter,
        withSearch: withSearch
    }
}

export const ChooseItem = (id, checked) =>{
    return {
        type: CHOOSE_ITEM,
        id: id,
        checked: checked
    }
}

export const SetModal = () => {
    return {
        type: SET_MODAL
    }
}

export const DeleteItemRequest = () => {
    return dispatch => {
        batch(()=>{
            dispatch(Loading())
            deleteProducts().then(
                res => dispatch(SuccessfulDelete(res)),
                err => dispatch(FailedDelete(err))
            ).finally(()=>{
                setTimeout(()=>{
                    dispatch(destroyResponse())
                }, 3000)
            })
        })
    }
}

export const SuccessfulDelete = (res) => {
    return {
        type: SUCCESSFUL_DELETE,
        res: res
    }
}

export const FailedDelete = (err) => {
    return {
        type: FAILED_DELETE,
        err: err
    }
}

export const Loading = () => {
    return {
        type: LOADING
    }
}
export const destroyResponse = () => {
    return {
        type: DESTROY_RESPONSE
    }
}
