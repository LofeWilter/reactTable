import React, {useRef} from 'react';
import './style/modal.css'

function Modal({quantity, deleteItems, setModal, deleteRequest}) {

    const outerEl = useRef(null)

    return (
        <div className='outerModal'
             ref={outerEl}
             onClick={e => outerEl.current === e.target ? setModal() : null}
        >
            <div className='modal'>
                {deleteRequest ? <div>
                    <p>You choose {quantity} item to delete. Are you sure?</p>
                    <div className='btns'>
                        <button
                            className='yes modal_btn'
                            onClick={() => deleteItems()}>Yes
                        </button>
                        <button
                            className='no modal_btn'
                            onClick={() => setModal()}>No
                        </button>
                    </div>
                </div> : <span>Loading...</span>}
            </div>
        </div>
    );
}

export default Modal;
