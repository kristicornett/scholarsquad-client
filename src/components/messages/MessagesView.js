import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import { Button, FormLabel, TextareaAutosize, Select, Box, Stack, MenuItem, Grid, TextField, Typography } from '@mui/material';
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

    const onSendMessageSubmit = () => {
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
            <Box component="form" noValidate onSubmit={onSendMessageSubmit} sx={{ mt: 3, minWidth:"350px", maxWidth:"550px", border: "1px solid gray",
                                                                                  padding: 5, borderRadius: "8px" }} 
                 ref={sendMessageFormRef}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormLabel>From: </FormLabel>
                  <Typography>{userDetails.first_name + " " + userDetails.last_name}</Typography>
                </Grid>
                <Grid item xs={12}>
                <FormLabel>To: </FormLabel><br />
                  <Select
                    size="small"
                    fullWidth
                    id="message-to-select"
                    inputRef={selectedUserRef}>
                      {allUsers.map((user) => {
                          return (
                      <MenuItem key={user.id} value={user.id}>{user.first_name + " " + user.last_name}</MenuItem>
                          )
                      })}
                    </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    autoComplete="subject"
                    inputRef={sendLetterSubjectRef}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormLabel>Body: </FormLabel><br />
                  <Stack
                      direction="column"
                      justifyContent="center"
                      alignItems="stretch"
                      spacing={2}
                  >
                  <TextareaAutosize
                    required
                    label="body"
                    variant="outlined"
                    minRows={3}
                    sx={{m: 1}}
                    id="subject"
                    ref={sendLetterBodyRef}
                  />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                <Button variant="contained" size="small" type="submit" sx={{m: 1}}>Send</Button>
                <Button variant="contained" size="small" onClick={(e) => { 
                  setIsShowMessage(!isSendMessage) 
                  sendMessageFormRef.current.reset()
                  }}>Cancel
                </Button>
                </Grid>
              </Grid>
            </Box>
              )
      }
      else{
        return (
          <><div>Message Sent</div><Button size="small" sx={{m: 1}} onClick={(e) => setIsShowMessage(false)}>Close</Button></>
        )
      }

    }


    return(
      <>
      {isSendMessage && 
         sendMessageForm()
      }
      {!isSendMessage && 
      <div style={{marginTop: 15}}>
        <Button variant="contained" size="small" onClick={(e) => { 
          setShowMessageSent(false)
          setIsShowMessage(!isSendMessage) 
        }}>Send Message</Button>
      </div>
      }
      
      <Box sx={{ height: 400, width: '100%', marginTop: 5 }}>
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