import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupFormPage from '../SignupFormPage'

function SignUpFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <p style={{ color: 'white', opacity: '0.85' }} onClick={() => setShowModal(true)}>Sign Up</p>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <SignupFormPage />
                </Modal>
            )}
        </>
    );
}

export default SignUpFormModal;
