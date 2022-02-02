import React from 'react'
import styled from 'styled-components'
import Header from '../components/header'
import { useForm } from "react-hook-form";


interface ITicketData {
    name: string,
    description: string,
    information: {
        phoneNumber: number,
        email: string
    }
}
const CreateTicketPage = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit: any = (data: ITicketData) => console.log(data);

    return (
        <Styled>
            <Header pageName="Create Ticket" />
            <div className="container">
                <form onSubmit={handleSubmit(onSubmit)} method="post">
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <div className="form-input">
                                <label>Ticket Name</label>
                                <input {...register("name", { required: true })} placeholder="Ticket name" />
                                {errors.name && <span className="validate-text">This field is required</span>}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-lg-6">
                            <div className="form-input">
                                <label>Email</label>
                                <input {...register("email" , { required: true })} placeholder="Email" />
                                {errors.email && <span className="validate-text">This field is required</span>}
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div className="form-input">
                                <label>Phone number</label>
                                <input {...register("phone",{ required: true })} placeholder="Phone number" />
                                {errors.phone && <span className="validate-text">This field is required</span>}

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-input">
                            <label>Description</label>
                            <input {...register("description")} placeholder="Description" />
                        </div>
                    </div>
                    <button type="submit" > Create Ticket </button>
                </form>
            </div>

        </Styled>
    )
}

export default CreateTicketPage

const Styled = styled.div`
  
`;
