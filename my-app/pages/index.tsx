import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CheckBox from '../components/checkbox'
import FormTicket from '../components/form'
import Header from '../components/header'
import Menu from '../components/menu'
import Modal from '../components/modal'
import { callService, method } from '../core/callApi'

const Home: NextPage = () => {
  const [dataPendingData, setDataPendingData] = useState<Array<any>>([])
  const [dataAcceptedData, setDataAcceptedData] = useState<Array<any>>([])
  const [dataRejectedData, setDataRejectedData] = useState<Array<any>>([])
  const [dataResolvedData, setDataResolvedData] = useState<Array<any>>([])
  const [dataEdit, setDataEdit] = useState<any>(null)

  const [openModel, setOpenModel] = useState<boolean>(false)

  const callservice = async () => {
    const response = await callService(
      {
        method: method.get,
        url: "http://localhost:8000/ticket/get",
      }
    )
    if (response.status === 200) {
      setDataPendingData(response.data.pendingData)
      setDataAcceptedData(response.data.acceptedData)
      setDataRejectedData(response.data.rejectedData)
      setDataResolvedData(response.data.resolvedData)
    }

  };
  useEffect(() => {
    callservice()
  }, [])

  return (
    <Styled>
      <Header pageName="Dashboard" />
      <div className="container">
        <div className="row">
          <div className="col-md-3 line-right">
            <div className="header">
              <h3>Pending</h3>
            </div>
            {dataPendingData.map((o: any, key: number) =>
            (
             <div className="box" key={key}>
                <CheckBox  name={o.name} onClick={(e : any) => console.log(e)}/>
                  {o.description}
                <button className="btn-edit" onClick={() =>{ 
                  setOpenModel(true)
                  setDataEdit(o)
                }}> Edit </button>
              </div>)
            )}
          </div>
          <div className="col-md-3">
            <div className="header">
              <h3>Accepted</h3>
            </div>
            {dataAcceptedData.map((o: any, key: number) =>
            (
              <div className="box" key={key}>
                <CheckBox  name={o.name} text={o.name} onClick={(e : any) => console.log(e)}/>
                {o.description}
                
                <button className="btn-edit" onClick={() =>{ 
                  setOpenModel(true)
                  setDataEdit(o)
                }}> Edit </button>
              </div>)
            )}
          </div>
          <div className="col-md-3">
            <div className="header">
              <h3>Rejected</h3>
            </div>
            {dataRejectedData.map((o: any, key: number) =>
            (
              <div className="box" key={key}>
                  <CheckBox  name={o.name} text={o.name} onClick={(e : any) => console.log(e)}/>
                  {o.description}
                  <button className="btn-edit" onClick={() =>{ 
                  setOpenModel(true)
                  setDataEdit(o)
                }}> Edit </button>
              </div>)
            )}
          </div>
          <div className="col-md-3">
            <div className="header">
              <h3>Resolved</h3>
            </div>
            {dataResolvedData.map((o: any, key: number) =>
            (
              <div className="box" key={key}>
                <CheckBox  name={o.name} text={o.name} onClick={(e : any) => console.log(e)}/>
                {o.description}
               
                <button className="btn-edit" onClick={() =>{ 
                  setOpenModel(true)
                  setDataEdit(o)
                }}> Edit </button>
              </div>)
            )}
          </div>
        </div>
      </div>

      <Modal
        name = "Edit Ticket"
        isShowModal={openModel}
        closeModal={() => {setOpenModel(false)}}
      >
              <FormTicket  data={dataEdit} callBack={(data)=> console.log(data)}/>
      </Modal>

    </Styled>
  )
}

export default Home

const Styled = styled.div`
  .header { 
    text-align: center;
    cursor:pointer;
  }
  .header:hover {
    color: var(--bs-blue)
  }

  .box { 
    padding: 0.5em;
    border: 1px solid var(--bs-primary);
    border-radius: 20px;
    min-height: 150px;
    max-height: 200px;
    margin-bottom: 20px;
    position: relative;
    button { 
      position: absolute;
      width: 60px;
      right: 5px;
      bottom: 10px;
    }
  }
`;
