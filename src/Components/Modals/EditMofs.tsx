import React from 'react'
import { UpdateMofPropsInterface } from '../../Types/UtilsTypes'

export const EditMofs: React.FC<UpdateMofPropsInterface>= ({cenoteId, theme, category, showModal, handleToggleModal, refetch}) => {
  return (
    <>
        {showModal && (
            <div
                className={`modal fade ${showModal ? "show" : ""}`}
                id="modal-create-cenote"
                style={{ paddingRight: 22, display: "block" }}
                aria-modal="true"
                role="dialog"
                data-backdrop="static"
            >
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title-c">Editar {category}</h4>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={handleToggleModal}
                            >
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>content</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}
