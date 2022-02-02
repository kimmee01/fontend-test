
import React, { FC } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

interface IModalProps {
    isShowModal? : boolean,
    closeModal : () => void,
    name : string,
}
const Modal : FC<IModalProps> = (props) => {
    return (
        <Styled>
            {props.isShowModal && (
            <>
                <div className="overlay">
                    
                </div>
                <div className="modal">
                    <div className="header-modal">
                        <h3> {props.name}</h3>
                        <div className="close-icon">
                            <i className="fas fa-times" onClick={() => props.closeModal()}></i>
                        </div>
                    </div>
                    <div className="body-modal">
                       {props.children}
                    </div>
                </div>
            </>  
            )}
        </Styled>
    )
}

export default Modal

const Styled = styled.div `
.modal {
    position: absolute;
    top: 40px;
    left: 40px;
    right: 40px;
    background-color: papayawhip;
    border-radius: 20px;
    width: 50%;
    margin: auto;
    min-height: 500px;
    height: auto;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bs-black);
    opacity: 0.5;
  }
  .body-modal{
      padding: 20px;
  }
  .header-modal { 
    padding : 20px;
    height:60px;
    position: relative;

    .close-icon{ 
        font-size:30px;
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
    }
  }
 
`


