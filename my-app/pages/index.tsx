import type { NextPage } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import CheckBox from '../components/checkbox'
import FormTicket from '../components/form'
import Header from '../components/header'
import Menu from '../components/menu'
import Modal from '../components/modal'
import { callService, method } from '../core/callApi'
import { statusTicket } from '../core/enum'
import { ticketAction, updateList } from '../redux/actions/ticket.action'
import { DefaultRootState } from '../redux/reducers/rootReducers'

interface ITicketData {
  id: number,
  name: string,
  description: string,
  phoneNumber: number,
  email: string,
  isCheck: boolean,
  updateDated: Date
}


const Home: NextPage = () => {
  const dispatch = useDispatch()
  const listData = useSelector((state: DefaultRootState) => state.TicketReducer)
  const [dataPendingData, setDataPendingData] = useState<Array<ITicketData>>([])
  const [dataAcceptedData, setDataAcceptedData] = useState<Array<ITicketData>>([])
  const [dataRejectedData, setDataRejectedData] = useState<Array<ITicketData>>([])
  const [dataResolvedData, setDataResolvedData] = useState<Array<ITicketData>>([])
  const [sortData, setSortData] = useState({
    pending: "old",
    accept: "old",
    reject: "old",
    resolve: "old",
  })

  const [isUpdate, setUpdate] = useState<boolean>(false)
  const [dataEdit, setDataEdit] = useState<ITicketData>()
  const [openModel, setOpenModel] = useState<boolean>(false)
  const [openModelInformation, setOpenModelInformation] = useState<boolean>(false)


  const [dataList, setDataList] = useState<Array<ITicketData>>([])

  const callservice = async () => {
    const responsePendingData = await callService(
      {
        method: method.get,
        url: "http://localhost:8000/ticket/get/ticketPending",
      }
    )
    if (responsePendingData.status === 200) {
      responsePendingData.data.pendingData.forEach((element: ITicketData) => {
        element.isCheck = false
      });
      setDataPendingData(responsePendingData.data.pendingData)
    }
    const responseAcceptedData = await callService(
      {
        method: method.get,
        url: "http://localhost:8000/ticket/get/ticketAccepted",
      }
    )
    if (responseAcceptedData.status === 200) {
      responseAcceptedData.data.acceptedData.forEach((element: ITicketData) => {
        element.isCheck = false
      });
      setDataAcceptedData(responseAcceptedData.data.acceptedData)
    }
    const responseRejectedData = await callService(
      {
        method: method.get,
        url: "http://localhost:8000/ticket/get/ticketRejected",
      }
    )
    if (responseRejectedData.status === 200) {
      responseRejectedData.data.rejectedData.forEach((element: ITicketData) => {
        element.isCheck = false
      });
      setDataRejectedData(responseRejectedData.data.rejectedData)

    }
    const responseResolvedData = await callService(
      {
        method: method.get,
        url: "http://localhost:8000/ticket/get/ticketResolved",
      }
    )
    if (responseResolvedData.status === 200) {
      responseResolvedData.data.resolvedData.forEach((element: ITicketData) => {
        element.isCheck = false
      });
      setDataResolvedData(responseResolvedData.data.resolvedData)
    }
  };

  useEffect(() => {
    callservice()
  }, [])

  useEffect(() => {
    setDataList(listData)
  }, [listData])


  const fnsetDatalist = (data: ITicketData, checked: boolean) => {
    const findData = listData.find((o: ITicketData) => o.id === data.id)
    if (!findData) {
      dispatch(ticketAction([...listData, data]))
    } else {
      const list = listData.filter((o: ITicketData) => o.id != findData.id)
      dispatch(ticketAction(list))
    }

    dataPendingData.forEach(o => {
      if (data.id === o.id) {
        o.isCheck = checked
      }
    })
    dataAcceptedData.forEach(o => {
      if (data.id === o.id) {
        o.isCheck = checked
      }
    })

    dataRejectedData.forEach(o => {
      if (data.id === o.id) {
        o.isCheck = checked
      }
    })

    dataResolvedData.forEach(o => {
      if (data.id === o.id) {
        o.isCheck = checked
      }
    })

    setDataPendingData(dataPendingData)
  }

  const sortby = (status: string) => {
    switch (status) {
      case statusTicket.pending:
        if (sortData.pending == "new") {
          setDataPendingData(dataPendingData.sort((a: ITicketData, b: ITicketData) => a.updateDated < b.updateDated ? 1 : -1));
          setSortData({ ...sortData, pending: "old" })
        } else {
          setDataPendingData(dataPendingData.sort((a: ITicketData, b: ITicketData) => a.updateDated > b.updateDated ? 1 : -1));
          setSortData({ ...sortData, pending: "new" })
        }
        break;
      case statusTicket.accepted:
        if (sortData.accept == "new") {
          setDataAcceptedData(dataAcceptedData.sort((a: ITicketData, b: ITicketData) => a.updateDated < b.updateDated ? 1 : -1));
          setSortData({ ...sortData, accept: "old" })
        } else {
          setDataAcceptedData(dataAcceptedData.sort((a: ITicketData, b: ITicketData) => a.updateDated > b.updateDated ? 1 : -1));
          setSortData({ ...sortData, accept: "new" })
        }
        break;
      case statusTicket.rejected:
        if (sortData.reject == "new") {
          setDataRejectedData(dataRejectedData.sort((a: ITicketData, b: ITicketData) => a.updateDated < b.updateDated ? 1 : -1));
          setSortData({ ...sortData, reject: "old" })
        } else {
          setDataRejectedData(dataRejectedData.sort((a: ITicketData, b: ITicketData) => a.updateDated > b.updateDated ? 1 : -1));
          setSortData({ ...sortData, reject: "new" })
        }
        break;
      case statusTicket.resolved:
        if (sortData.resolve == "new") {
          setDataResolvedData(dataResolvedData.sort((a: ITicketData, b: ITicketData) => a.updateDated < b.updateDated ? 1 : -1));
          setSortData({ ...sortData, resolve: "old" })
        } else {
          setDataResolvedData(dataResolvedData.sort((a: ITicketData, b: ITicketData) => a.updateDated > b.updateDated ? 1 : -1));
          setSortData({ ...sortData, resolve: "new" })
        }
        break;
    }
    setUpdate(true)

  }

  useEffect(() => {
    setUpdate(false)
  }, [isUpdate])

  const editTicket = async (data: ITicketData) => {
    const response = await callService(
      {
        method: method.put,
        url: "http://localhost:8000/ticket/edit",
        data: data
      }
    )
    if (response.status === 200) {
      callservice()
    }
  }

  const updateTicket = async (status: string) => {
    const list = {
      status,
      data: dataList
    }
    const response = await callService(
      {
        method: method.put,
        url: "http://localhost:8000/ticket/update/listTicket",
        data: list
      }
    )
    if (response.status === 200) {
      callservice()
      dispatch(ticketAction([]))
    }
    setUpdate(true)

  }
  return (
    <Styled>
      <Header pageName="Dashboard" />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div className="header">
              <h3 onClick={() => updateTicket(statusTicket.pending)}>Pending</h3>
              <div className="sort" onClick={() => sortby(statusTicket.pending)}>
                {sortData.pending === "old" && <i className="fas fa-sort-up"></i>}
                {sortData.pending === "new" && <i className="fas fa-sort-down"></i>}
              </div>
            </div>
            <div className="colunm">
              {dataPendingData.map((o: ITicketData, key: number) =>
              (
                <div className="box" key={key}>
                  <CheckBox isChecked={o.isCheck} name={o.name} onClick={(e: any) => {
                    fnsetDatalist(o, e)
                  }} />
                  <div className="">
                    <p><i className="fa far fa-envelope"></i> {o.email}</p>
                    <p><i className="fas fa-mobile-alt"></i> {o.phoneNumber}</p>
                  </div>
                  {o.description && (
                    <p className="see-more"
                      onClick={() => {
                        setOpenModelInformation(true)
                        setDataEdit(o)
                      }}
                    >See more</p>
                  )}
                  <button className="btn-edit" onClick={() => {
                    setOpenModel(true)
                    setDataEdit(o)
                  }}> Edit </button>
                </div>)
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="header">
              <h3 onClick={() => updateTicket(statusTicket.accepted)}>Accepted</h3>
              <div className="sort" onClick={() => sortby(statusTicket.accepted)}>
                {sortData.accept === "old" && <i className="fas fa-sort-up"></i>}
                {sortData.accept === "new" && <i className="fas fa-sort-down"></i>}
              </div>
            </div>
            <div className="colunm">
              {dataAcceptedData.map((o: ITicketData, key: number) =>
              (
                <div className="box" key={key}>
                  <CheckBox isChecked={o.isCheck} name={o.name} text={o.name} onClick={(e: any) => fnsetDatalist(o, e)
                  } />

                  <div className="">
                    <p><i className="fa far fa-envelope"></i> {o.email}</p>
                    <p><i className="fas fa-mobile-alt"></i> {o.phoneNumber}</p>
                  </div>
                  {o.description && (
                    <p className="see-more" onClick={() => {
                      setOpenModelInformation(true)
                      setDataEdit(o)
                    }}>See more</p>
                  )}

                  <button className="btn-edit" onClick={() => {
                    setOpenModel(true)
                    setDataEdit(o)
                  }}> Edit </button>
                </div>)
              )}
            </div>
          </div>
          <div className="col-md-3">
            <div className="header">
              <h3 onClick={() => updateTicket(statusTicket.rejected)}>Rejected</h3>
              <div className="sort" onClick={() => sortby(statusTicket.rejected)}>
                {sortData.reject === "old" && <i className="fas fa-sort-up"></i>}
                {sortData.reject === "new" && <i className="fas fa-sort-down"></i>}
              </div>
            </div>
            <div className="colunm">
              {dataRejectedData.map((o: ITicketData, key: number) =>
              (
                <div className="box" key={key}>
                  <CheckBox isChecked={o.isCheck} name={o.name} text={o.name} onClick={(e: any) => fnsetDatalist(o, e)} />
                  <div className="">
                    <p><i className="fa far fa-envelope"></i> {o.email}</p>
                    <p><i className="fas fa-mobile-alt"></i> {o.phoneNumber}</p>
                  </div>
                  {o.description && (
                    <p className="see-more" onClick={() => {
                      setOpenModelInformation(true)
                      setDataEdit(o)
                    }}>See more</p>
                  )}
                  <button className="btn-edit" onClick={() => {
                    setOpenModel(true)
                    setDataEdit(o)
                  }}> Edit </button>
                </div>)
              )}
            </div>

          </div>
          <div className="col-md-3">
            <div className="header">
              <h3 onClick={() => updateTicket(statusTicket.resolved)}>Resolved</h3>
              <div className="sort" onClick={() => sortby(statusTicket.resolved)}>
                {sortData.resolve === "old" && <i className="fas fa-sort-up"></i>}
                {sortData.resolve === "new" && <i className="fas fa-sort-down"></i>}
              </div>
            </div>
            <div className="colunm">
              {dataResolvedData.map((o: ITicketData, key: number) =>
              (
                <div className="box" key={key}>
                  <CheckBox isChecked={o.isCheck} name={o.name} text={o.name} onClick={(e: any) => fnsetDatalist(o, e)} />
                  <div className="">
                    <p><i className="fa far fa-envelope"></i> {o.email}</p>
                    <p><i className="fas fa-mobile-alt"></i> {o.phoneNumber}</p>
                  </div>
                  {o.description && (
                    <p className="see-more" onClick={() => {
                      setOpenModelInformation(true)
                      setDataEdit(o)
                    }}>See more</p>
                  )}

                  <button className="btn-edit" onClick={() => {
                    setOpenModel(true)
                    setDataEdit(o)
                  }}> Edit </button>
                </div>)
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        name="Edit Ticket"
        isShowModal={openModel}
        closeModal={() => { setOpenModel(false) }}
      >
        <FormTicket data={dataEdit} callBack={(data) => {
          editTicket(data)
          setOpenModel(false)
        }} />
      </Modal>

      <Modal
        name="Information"
        isShowModal={openModelInformation}
        closeModal={() => { setOpenModelInformation(false) }} >
        <div className="detail">
          <h3>{dataEdit?.name}</h3>
          <div className="contact">
            <div className="phone">
              <i className="fas fa-mobile-alt"></i>
              <p> {dataEdit?.phoneNumber}</p>
            </div>
            <div className="email">
              <i className="fa far fa-envelope"></i>
              <p> {dataEdit?.email}</p>
            </div>
          </div>
          {dataEdit?.description}
        </div>
      </Modal>

    </Styled>
  )
}

export default Home

const Styled = styled.div`

  .header { 
    text-align: center;
    cursor:pointer;
    position: relative;
    .sort {
      font-size:18px;
      position: absolute;
      right: 5px;
      top: 5px;
      width: 20px;
      height: 20px;
    }
  }
  .header {
    h3:hover{
      color: var(--bs-blue);
    }
  }
  .colunm{
    height:80vh;
    white-space: nowrap;
    -ms-overflow-style: none;
    /* for Internet Explorer, Edge */
    scrollbar-width: none;
    /* for Firefox */
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    display: block;
    scroll-behavior: smooth;
  }


  .colunm::-webkit-scrollbar {
      display: none;
      /* for Chrome, Safari, and Opera */
  }

  .box { 
    padding: 0.5em;
    border: 1px solid var(--bs-primary);
    border-radius: 20px;
    min-height: 170px;
    max-height: 170px;
    margin-bottom: 20px;
    position: relative;
    p { 
      font-size:14px;
      i{
        padding-right: 5px;
        color : var(--bs-primary);
      }
    }
    .see-more{ 
      color : var(--bs-light-blue);
      cursor: pointer;
    }
    .see-more:hover { 
      color : var(--bs-blue);
    }
    button { 
      position: absolute;
      width: 40px;
      right: 5px;
      bottom: 10px;
    }
  }
  .detail {
    word-wrap: break-word;
    h3{
      margin-bottom: 20px;
    }
  }
  .contact{
    i{
      color : var(--bs-primary)
    }
    display :flex;
    .phone { 
      display: flex;
      font-size: 16px;
      p { 
        margin-left: 15px;
      }
    }
    .email { 
      margin-left: 15px;
      display: flex;
      font-size: 16px;
      p { 
        margin-left: 15px;
      }
    }
  }
  
`;
