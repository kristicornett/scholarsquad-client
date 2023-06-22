import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Button, Label } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { createMessage, getMessagesByUser, markMessageRead } from '../../managers/MessageManager';
import {  } from '@mui/icons-material';
import { getAllUsers, getUser } from '../../managers/UserManager';
import moment from 'moment/moment';

export const MessagesView = ({userData}) => {
    const [messageRows, setMessageRows] = useState([])
    const navigate = useNavigate()
    const sendMessageFormRef = useRef()
    const sendLetterSubjectRef = useRef()
    const sendLetterBodyRef = useRef()
    const selectedUserRef = useRef(0)
    const [isSendMessage, setIsShowMessage] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [allUsers, setAllUsers] = useState([])
    const [showMessageSent, setShowMessageSent] = useState(false)
    const [visibleMessage, setVisibleMessage] = useState()

    useEffect(() => {
      refreshMessages()
      getUser().then((result) => setUserDetails(result))
      getAllUsers().then((result) => setAllUsers(result))
    }, [])
    
    const refreshMessages = () => {
      getMessagesByUser()
      .then((result) => {
        const rowSet = []
        result.map((message) => {
            rowSet.push( {
                id: message.id, from: message.sender.first_name + " " + message.sender.last_name, subject: message.subject, 
                body: message.body, sent: moment(message.sent_date).format('MM/DD/YYYY hh:ssa'),
                 read_date: message.read_date, read: message.read_date ? moment(message.read_date).format('MM/DD/YYYY hh:ssa') : "Unread"
            })
        })
        setMessageRows(rowSet)
      })
    }
    



    const columns = [
      { field: 'from', headerName: 'From', width: 150 },
      { field: 'subject', headerName: 'Subject', width: 250},
      { field: 'sent', headerName: 'Sent', width: 300 },
      { field: 'read', headerName: 'Read', width: 150 },
      {
          field: "action",
          headerName: "Action",
          sortable: false,
          disableClickEventBubbling: true,
          width: 300,
          renderCell:  (params) => {
              const onClick = (e) => {
                const currentRow = params.row;
                if(!currentRow.read_date)
                {
                  sendReadMessage(currentRow.id)
                }
                setVisibleMessage(currentRow)
              };
              
              return (
                <Stack direction="row" spacing={2}>
                  <Button onClick={onClick}>View</Button>
                </Stack>
              );
          }
      }
    ]  

    const onClickSendMessage = () => {
      const msg = {
          "recipient" : selectedUserRef.current.value,
          "sender": userData.id,
          "subject": sendLetterSubjectRef.current.value,
          "body": sendLetterBodyRef.current.value
      }

      createMessage(msg)
      .then((result) => {
        setShowMessageSent(true)
      })

    }

    const sendReadMessage = (messageId) => {
        markMessageRead(messageId)
        .then((data) => {
          refreshMessages()
        })
    }

    const sendMessageForm = () => {


        if(!showMessageSent){
          return (
        <Box component="form" ref={sendMessageFormRef} >
          <div>
            <label>From: </label><span>{userDetails.first_name + " " + userDetails.last_name}</span>
          </div>
          <div>
            <label>to: </label>
            <select ref={selectedUserRef}>
              <option value="0">Select...</option>
              {allUsers.map((user) => {
                  return <option key={user.id} value={user.id}>{user.first_name + " " + user.last_name}</option>
              })}
            </select>
          </div>
          <div>
            <label>Subject: </label><input type="text" ref={sendLetterSubjectRef}></input>
          </div>
          <div>
            <label>Body: </label><input type="text" ref={sendLetterBodyRef}></input>
          </div>
          <div>
            <Button variant="contained" size="small" onClick={onClickSendMessage}>Send</Button>
            <Button variant="contained" size="small" onClick={(e) => { 
              setIsShowMessage(!isSendMessage) 
              sendMessageFormRef.current.reset()
              }}>Cancel</Button>
          </div>
        </Box>
              )
      }
      else{
        return (
          <><div>Message Sent</div><Button size="small" sx={{color: "red"}} onClick={(e) => setIsShowMessage(false)}> X </Button></>
        )
      }

    }


    return(
      <>
      {isSendMessage && 
         sendMessageForm()
      }
      {!isSendMessage && 
        <Button variant="contained" size="small" onClick={(e) => { 
          setShowMessageSent(false)
          setIsShowMessage(!isSendMessage) 
        }}>Send Message</Button>
      }
      <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={messageRows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>
    {!!visibleMessage && 
      <div>
          <div>
            <label>From: </label>
            <span>{visibleMessage.from}</span>
          </div>
          <div>
            <label>Sent: </label>
            <span>{visibleMessage.sent}</span>
          </div>
          <div>
            <label>Subject: </label>
            <span>{visibleMessage.subject}</span>
          </div>
          <div>
            <label>Message: </label>
            <span>{visibleMessage.body}</span>
          </div>
          <Button size="small" onClick={(e) => setVisibleMessage(null)}> Close </Button>
      </div>
    }
    </>
    )
}

