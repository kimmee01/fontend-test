import React, { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import PropTypes from 'prop-types';


interface ITicketData {
    data ?: {
        id?:number,
        name?: string,
        description?: string,
        phoneNumber?: number,
        email?: string
    },
    callBack?: (data : any)=> void
}

const FormTicket : FC<ITicketData>= (props) => {
    const [dataInitial , setDataInitial] = useState<any>(props.data)
    const { register, handleSubmit, watch, formState: { errors }, reset} = useForm({
        defaultValues : {
            id : dataInitial?.id || null,
            name : dataInitial?.name || null,
            email : dataInitial?.email || null,
            phoneNumber : dataInitial?.phoneNumber || null,
            description : dataInitial?.description || null,
        }
    });

    const cancel = ()=> {
        setDataInitial({})
        reset({
            name : null,
            email: null,
            phoneNumber : null,
            description : null,
        })
    }

    
    const onSubmit: any = async (data: ITicketData) => {
        setDataInitial({dataInitial , ...data})
        props.callBack && props.callBack(dataInitial)
    };
    
    return (
        <Styled>
                <form 
                onSubmit={handleSubmit(onSubmit)} method="post"
                >
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
                                <input {...register("email",
                                    { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                                    placeholder="Email" />
                                {errors.email?.type === "required" && <span className="validate-text">This field is required</span>}
                                {errors.email?.type === "pattern" && <span className="validate-text">This field is email format</span>}
                          
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-6">
                            <div className="form-input">
                                <label>Phone number</label>
                                <input {...register("phoneNumber", { required: true, pattern: /^(0|[1-9][0-9]*)$/, maxLength: 10 })} placeholder="Phone number" />
                                {errors.phoneNumber?.type === "required" && <span className="validate-text">This field is required</span>}
                                {errors.phoneNumber?.type === "pattern" && <span className="validate-text">This field is only number</span>}
                                {errors.phoneNumber?.type === "maxLength" && <span className="validate-text">This field is out of length</span>}

                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-input">
                            <label>Description</label>
                            <textarea  rows={4} {...register("description")} placeholder="Description" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <div className="form-input">
                                <button type="submit" > Create Ticket </button>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <div className="form-input">
                                <button className="btn-cancel" onClick={() => cancel()}> Cancel </button>
                            </div>
                        </div>

                    </div>
                </form>
        </Styled>
    )
}

export default FormTicket


FormTicket.propTypes = {
    callBack : PropTypes.any
};


const Styled = styled.div`
  
`;
