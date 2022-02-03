
import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styled from "styled-components";

const CheckBox = (props : any) => {
  const [isChecked , setIsChecked] = useState(false)

  useEffect(()=> {
    setIsChecked(props.isChecked)
  },[props.isChecked])
    return (
        <Styled>
            <label className="checkbox"> 
            {props.name?.substring(0, 10) + (props.name?.length > 10 ? '...' : "")}
                <input type="checkbox" 
                    id={props.name}
                    name="checkbox"
                    onClick={(e) => 
                      {setIsChecked((e.target  as HTMLInputElement).checked ) 
                      props.onClick != undefined && props.onClick(props.value ? (e.target  as HTMLInputElement)?.value : (e.target  as HTMLInputElement).checked ) }}
                    onChange={(e) => props.onChange != undefined && props.onChange(props.value ? e.target.value : e.target.checked) }
                    disabled={props.disabled}
                    value={props.value}
                    checked={isChecked}
                />
                <span className="checkmark"></span>
            </label>
        </Styled>
    )
}

CheckBox.propTypes = {
    text: PropTypes.string,
    name: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    isChecked : PropTypes.bool,
    onClick : PropTypes.func,
};
export default CheckBox

const Styled = styled.div `
.checkbox {
    overflow: hidden;
    width: 100%;
    padding: 10px 0px;
    position: relative;
    padding-left: 35px;
    cursor: pointer;
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.checkbox > input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}
.checkmark {
    position: absolute;
    top: 15px;
    left: 0;
    height: 25px;
    width: 25px;
    border-radius : 3px;
    background-color: #eee;
  }
/* On mouse-over, add a grey background color */
.checkbox:hover input ~ .checkmark {
    background-color: var(--bs-hover);
  }
  
  /* When the checkbox is checked, add a blue background */
  .checkbox input:checked ~ .checkmark{
    background-color: var(--bs-primary);
  }
  
  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

 input:checked ~ .checkmark:after {
    display: block;
  }
  
  /* Style the checkmark/indicator */
  .checkbox .checkmark:after {
    left: 10px;
    top: 3px;
    width: 7px;
    height: 15px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`