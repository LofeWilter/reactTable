import React from 'react';
import './style/ControlBar.css'

function ControlBar({state, changePagination, changePage, SearchAndFilter, setModal}) {
    const numOnPages = [10, 25, 50, 100, 500];
    let arrOfPages = []
    const pages = Math.ceil(state.changedItems.length / state.pagination)
    for (let i = 1; i <= pages; i++) {
        arrOfPages = arrOfPages.concat(i);
    }

    return (
        <div className='control-bar'>
            <div className='options'>
                <div>Search By Name
                    <input
                        type="text"
                        onChange={(e => SearchAndFilter(e.target.value, state.currentFilter.name.toLowerCase(), true))}
                    />
                </div>
                <button
                    disabled={state.checkedItems.length > 0 ? false : true}
                    onClick={() => setModal()}
                >Delete
                </button>
                <div className='arrowBar'>
                    <span onClick={() => changePage(1)}>&lt;&lt;</span>
                    <span onClick={() => changePage(state.currentPage === 1 ? 1 : state.currentPage - 1)}>&lt;</span>
                    {arrOfPages.filter((item, index) => index >= state.currentPage - 3 && index < state.currentPage + 2).map((item, index) => {
                        return <span
                            className={item === state.currentPage ? 'span active' : 'span'}
                            key={index}
                            onClick={() => changePage(item)}
                        >{item}</span>
                    })}
                    <span
                        onClick={() => changePage(state.currentPage !== Math.ceil(state.changedItems.length / state.pagination) ?
                            state.currentPage + 1 : state.currentPage
                        )}>&gt;</span>
                    <span
                        onClick={() => changePage(Math.ceil(state.changedItems.length / state.pagination))}>&gt;&gt;</span>
                </div>
                <div className="pagination">
                    <span>Products on page</span>
                    <div>
                        {numOnPages.map((item, index) => {
                            return <span
                                className={item === state.pagination ? 'span active' : 'span'}
                                key={index}
                                onClick={() => changePagination(item)}
                            >
                                {item}
                            </span>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ControlBar;
