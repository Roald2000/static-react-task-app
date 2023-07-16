

import { AiOutlineCloseCircle } from 'react-icons/ai';

export const modalController = (id, state = 'close', isModal = true) => {
    const modal = document.getElementById(id);

    switch (state) {
        case 'open':
            isModal ? modal.showModal() : modal.show()
            break;
        case 'close':
            modal.close();
            break;
    }

    modal.addEventListener("click", e => {
        const dialogDimensions = modal.getBoundingClientRect();
        if (
            e.clientX < dialogDimensions.left ||
            e.clientX > dialogDimensions.right ||
            e.clientY < dialogDimensions.top ||
            e.clientY > dialogDimensions.bottom
        ) {
            modal.close()
        }
    });
}

export function AppModal({ modalType = 'message', title = "Modal", id, className = "rounded z-50", children }) {
    switch (modalType) {
        case 'message':
            return <dialog className={className} id={id} key={id}>
                <div className='relative p-2'>
                    <h1 className='text-xl'>{title}</h1>
                    <button type="button" className="absolute top-0 right-0 rounded-full hover:bg-red-600 hover:text-white text-red-600" onClick={() => modalController(id, 'close')}>
                        <AiOutlineCloseCircle className="" size={32} />
                    </button>
                </div>
                <div className='p-2'>
                    {children}
                </div>
            </dialog>
        case 'pop-up':
            return <dialog className={className} id={id} key={id}>
                <div className='relative p-2'>
                    {title && <h1 className='text-xl'>{title}</h1>}
                    <button type="button" className="absolute top-0 right-0 rounded-full hover:bg-red-600 hover:text-white text-red-600" onClick={() => modalController(id, 'close')}>
                        <AiOutlineCloseCircle className="" size={32} />
                    </button>
                </div>
                <div className='p-2'>
                    {children}
                </div>
            </dialog>
        default:
            break;
    }

}
