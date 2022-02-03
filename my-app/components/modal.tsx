
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
    position: fixed;
    top: 40px;
    left: 40px;
    right: 40px;
    background-color: var(--bs-white);
    border-radius: 20px;
    width: 50%;
    margin: auto;
    min-height: 500px;
    height: auto;
    overflow: auto;
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
      height: 750px;
      overflow-y: auto;
  }
  .header-modal { 
    padding : 20px;
    height:60px;
    position: relative;
    box-shadow: 0px 4px 4px rgba(215, 215, 215, 0.25);

    .close-icon{ 
        font-size:30px;
        position: absolute;
        right: 20px;
        top: 10px;
        cursor: pointer;
    }
  }


  @media screen and (min-width: 426px) and (max-width: 768px) {
    .modal{
        top: 100px;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 425px) {
      body {
        
      }
    .modal{ 
       
        width: 100%;
        left: 0px;
        right: 0px;
    }
  }
`


