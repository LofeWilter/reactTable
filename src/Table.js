import React, {useEffect} from 'react';
import './style/Table.css';
import TableItem from "./TableItem";
import Modal from "./modal";
import Response from "./Response";

function Table({fetchData, data, filterTable, chooseItems, setModal, deleteItems}) {

    const headers = ['#', 'ID', 'Product', 'Calories', 'Fat', 'Carbs', 'Protein', 'Iron']

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            {data.failedFetch && <div className="failedLoading">Something went wrong please try again....</div>}
            <table>
                <thead>
                <tr>
                    {headers.map((item, index) => {
                        return (
                            <td className='headerItem'
                                key={index}
                                onClick={() => filterTable(item.toLowerCase())}
                            >{item}{
                                data.currentFilter.name === item.toLowerCase() ? <span>
                                    {!data.currentFilter.direction ? <span>&#8593;</span> : <span>&#8595;</span>}
                                </span> : null
                            }</td>
                        )
                    })}
                </tr>
                </thead>
                {data.items.length > 0 ?
                    <tbody>
                    {data.changedItems.filter((item, index) => { // 1000 / 100 === 10
                        return index < data.currentPage * data.pagination &&
                            index >= data.pagination * data.currentPage - data.pagination
                    }).map(item => <TableItem item={item} key={item.id} chooseItems={chooseItems}
                                              choosenItems={data.checkedItems}/>)}
                    </tbody> : <tbody>
                    <tr>
                        <td>Loading...</td>
                    </tr>
                    </tbody>
                }
            </table>
            {data.isModalOpen && <Modal
                quantity={data.checkedItems.length}
                setModal={setModal}
                deleteItems={deleteItems}
                deleteRequest={data.deleteRequest}
            />}
            <Response response={data.resultOfDeleting}/>
        </div>
    )
}

export default Table;
