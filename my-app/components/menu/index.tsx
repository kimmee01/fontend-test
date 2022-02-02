import Link from 'next/link';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import { config } from '../../core/config';

interface IHeader {
    url?: string;
}

const Menu = (props: IHeader) => {

    const [isShowMenu , setIsShowMenu] = useState<boolean>(false)
   
    return (
        <Styled
        isShowMenu = {isShowMenu}
        >
            <div className="bar-icon" onClick={() => setIsShowMenu(!isShowMenu)}>
                <i className="fas fa-bars"></i>
            </div>
            <div className={`menu`}>
                    <div className="header" onClick={() => setIsShowMenu(!isShowMenu)}>
                        <Link href="/" >
                         <h1> Test </h1>
                        </Link>
                        <div className="close-icon" onClick={() => setIsShowMenu(!isShowMenu)}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                <ul>
                    {config.menu.map((o: any , key : number) =>
                       <Link href={o.url}  key={key}>
                            <li onClick={() => setIsShowMenu(!isShowMenu)} key={key}>
                                <p>{o.name}</p>
                            </li>
                        </Link>
                    )}

                </ul>
            </div>


        </Styled>
    )
}
Menu.propTypes = {

};


export default Menu;

const Styled = styled.nav<any>`
    width:25%;
    background-color: var(--bs-blue);
    .menu {
        width: 100%;
        height: 100vh;
        background-color: var(--bs-blue);
        color: var(--bs-white);
        padding: 20px ;
    }
    .header{
        cursor: pointer;
        position: relative;
        .close-icon{
            display: none;
        }
    }
    ul {
        list-style: none;
        margin-left: 0px;
        padding-left: 0px;
    }

    ul li {
        cursor: pointer;
        p{
            font-size:16px;
        }
    }

    li:hover { 
        color : var(--bs-purple);
    }
    .bar-icon { 
        display: none;
    }

    @media only screen and (max-width: 425px) {
        width: 100%;
        padding: 20px;
            .bar-icon{
                display: block;
                i{
                    font-size:20px;
                    color: var(--bs-white)
                }
            }
       
        .menu {
            display:${p => p.isShowMenu ? 'block' : 'none'};
            position: absolute;
            top:0;
            left:0;
        }
        .header{
            .close-icon{ 
                width:40px;
                height: 40px;
                display:block;
                position: absolute;
                right:5px;
                top:0px;
                font-size:30px;
            }
        }
    }
`;



