import React from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import { useForm } from "react-hook-form";
import { callService, method } from '../core/callApi';
import { statusTicket } from '../core/enum';
import FormTicket from '../components/form';


interface ITicketData {
    name: string,
    description: string,
    phoneNumber: number,
    email: string,
}
const CreateTicketPage = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const callservice = async (data : any) => {
        const response = await callService(
            {
                method: method.post,
                url: "http://localhost:8000/ticket/create",
                data: data
            }
        )
        reset()
        console.log("response", response)
    };
    return (
        <Styled>
            <Header pageName="Create Ticket" />
            <div className="container">
                <FormTicket callBack={(data)=> {callservice(data)}}/>
            </div>
        </Styled>
    )
}

export default CreateTicketPage

const Styled = styled.div`
  
`;
