import React from 'react'
import { ConfirmActionPropsInterface } from '../../Types/UtilsTypes'

export const ConfirmAction: React.FC<ConfirmActionPropsInterface> = ({ show, title, message, onConfirm, onCancel }) => {
    return (
        <div>
            {show && (
                <div
                    className={`modal fade ${show ? "show" : ""}`}
                    id="modal-delete-modal"
                    style={{ paddingRight: 22, display: "block" }}
                    aria-modal="true"
                    role="dialog"
                    data-backdrop="static"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h4 className="modal-title-c">{title}</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={onCancel}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                            </div>
                            
                            <div className="modal-body">
                                <h5>{message}</h5>
                            </div>
                            <div className="modal-footer justify-content-between">
                                <button type="button" className="btn btn-default" onClick={onCancel}>
                                    Cancelar
                                </button>
                                <button type="button" className="btn btn-primary"onClick={onConfirm}>
                                    Confirmar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
