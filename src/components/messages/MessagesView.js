import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"
import Box from '@mui/material/Box';
import { getTeacherClassrooms } from '../../managers/TeacherManager';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getMessagesByUser } from '../../managers/MessageManager';

export const MessagesView = ({userData}) => {
    const [rows, setRows] = useState([])
    const [columns, setColumns] = useState([])
    const navigate = useNavigate()
    const RenderActionButtons = ({params}) => {
        const [count, setCount] = useState(0);
      
        return (
          <Button onClick={() => setCount((prev) => prev + 1)}>{count} click(s)</Button>
        );
      }
    
    const renderMessages = (messages) => {
        setColumns([
            { field: 'sender', headerName: 'From', width: 150 },
            { field: 'subject', headerName: 'Subject', width: 250},
            { field: 'body', headerName: 'Message', width: 350 },
            { field: 'sent_date', headerName: 'Sent', width: 150 },
            { field: 'read_date', headerName: 'Read', width: 150 },
            {
                field: "action",
                headerName: "Action",
                sortable: false,
                disableClickEventBubbling: true,
                width: 300,
                renderCell:  (params) => {
                    const onClick = (e) => {
                      const currentRow = params.row;
                      navigate(`/classrooms/${currentRow.id}`)
                    };
                    
                    return (
                      <Stack direction="row" spacing={2}>
                        <Button onClick={onClick}>Message</Button>
                      </Stack>
                    );
                }
            }
        ])
        const rowSet = []
        messages.map((message) => {
            rowSet.push( {
                id: message.id, from: message.sender, subject: message.subject, sent: message.sent_date, read: message.read_date
            })
        })
        setRows(rowSet)
    }

    useEffect(() => {
        getMessagesByUser(userData.messageId)
        .then((result) => {
            renderMessages(result)
        })
    }, [])

    return(
        <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
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
    )
}
    

