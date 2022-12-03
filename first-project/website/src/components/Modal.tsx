import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ children, open }: any) => {

    return (
        <>
            {open ?
                ReactDOM.createPortal(
                    <div id="modal-root" className='modal'>
                        {children}
                    </div>,
                    document.body)
                : null
            }
        </>

    )
}

export default Modal;