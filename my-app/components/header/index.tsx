import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

interface IHeader { 
    url? : string;
    pageName? : string;
    isShowIconBack : boolean;
}

const  Header = (props : IHeader) => { 
    return (
        <Styled
        isShowIconBack ={props.isShowIconBack}
        >
            {
                props.isShowIconBack &&
                (<Link href={props.url || "/"}>
                        <i className="fas fa-angle-left"></i>
                </Link>)
            }
          
            {
                props.pageName && (
                    <h2 className="page-name">{props.pageName}</h2>
                )
            }
          
        </Styled>
    ) 
}
Header.defaultProps = {
    isShowIconBack: false
};

Header.propTypes = {
    url : PropTypes.string,
    pageName : PropTypes.string,
    isShowIconBack : PropTypes.bool,
};



export default Header ;

const Styled = styled.nav<any>`
    display: inline-flex; 
    align-items:  center;
    padding : 20px 30px;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(215, 215, 215, 0.25);
    .page-name{
        margin-left: ${props => !props.isShowIconBack ? "0px" : "20px"} ;
    }
    i {
        font-size:30px;
        cursor: pointer;
    }
`;