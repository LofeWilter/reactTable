let initialState = {
    items: [],
    changedItems: [],
    failedFetch: false,
    pagination: 100,
    currentPage: 2,
    currentFilter: {
        name: '',
        direction: true
    },
    checkedItems: [],
    isModalOpen: false,
    deleteRequest: true,
    resultOfDeleting: null
}

const tableReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_STATE': {
            return {
                ...state,
                items: [...state.items, ...action.data],
                changedItems: [...state.changedItems, ...action.data]
            }
        }
        case 'LOADING_FAIL': {
            return {
                ...state,
                failedFetch: true
            }
        }
        case 'CHANGE_PAGE': {
            return {
                ...state,
                currentPage: action.newPage,
                checkedItems: []
            }
        }
        case 'CHANGE_PAGINATION': {
            return {
                ...state,
                pagination: action.newValue,
                currentPage: 1,
                checkedItems: []
            }
        }
        case 'SEARCH_PRODUCT': {
            return {
                ...state,
                currentPage: 1,
                changedItems: state.items.filter(item => item.product.toLowerCase().includes(action.name.toLowerCase()))
            }
        }
        case 'FILTER_TABLE': {
            let changedDirection = state.currentFilter.direction
            let changedItems;
            if (action.withSearch) {
                changedItems = state.changedItems.sort((a,b) => {
                    if (!changedDirection) {
                        return a[action.filter] - b[action.filter]
                    } else return b[action.filter] - a[action.filter]
                })
            } else if (state.currentFilter.name.toLowerCase() !== action.filter ) {
                changedItems = state.changedItems.sort((a, b) => a[action.filter] - b[action.filter])
                changedDirection = false
            } else if (state.currentFilter.name.toLowerCase() === action.filter) {
                if (!state.currentFilter.direction) {
                    changedItems = state.changedItems.sort((a, b) => b[action.filter] - a[action.filter])
                } else if (state.currentFilter.direction) {
                    changedItems = state.changedItems.sort((a, b) => a[action.filter] - b[action.filter])
                }
                changedDirection = !state.currentFilter.direction
            }
            return {
                ...state,
                currentPage: 1,
                changedItems: changedItems,
                currentFilter: {
                    direction: changedDirection,
                    name: action.filter
                },
                checkedItems: []
            }
        }
        case 'CHOOSE_ITEM' : {
            if (!action.checked) {
                return {
                    ...state,
                    checkedItems: state.checkedItems.filter(item => item !== action.id)
                }
            } else return {
                ...state,
                checkedItems: state.checkedItems.concat(action.id)
            }
        }
        case 'SET_MODAL': {
            return {
                ...state,
                isModalOpen: !state.isModalOpen
            }
        }
        case 'SUCCESSFUL_DELETE': {
            let newItems = state.items.filter(item => !state.checkedItems.some(el => el === item.id))
            return {
                ...state,
                items: newItems,
                changedItems: newItems,
                checkedItems: [],
                deleteRequest: true,
                isModalOpen: false,
                resultOfDeleting: action.res.message
            }
        }
        case 'FAILED_DELETE': {
            return {
                ...state,
                deleteRequest: true,
                resultOfDeleting: action.err.error,
                isModalOpen: false
            }
        }
        case "LOADING": {
            return {
                ...state,
                deleteRequest: false
            }
        }
        case 'DESTROY_RESPONSE': {
            return {
                ...state,
                resultOfDeleting: null
            }
        }
        default:
            return state
    }
}

export default tableReducer;
