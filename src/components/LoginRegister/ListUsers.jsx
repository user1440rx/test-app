import * as React from 'react';
import {useEffect, useState} from 'react';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Axios from 'axios';



const CSDiv = styled('div')(({ theme }) => ({
    backgroundColor: '#121212',
    color: '#fff'
  }));


const UserCard = (prop) => {
    const username = prop.name;
    const email = prop.email;

    return(
      <CSDiv>
        <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: '#4caf50' }} variant="square">
                  <AccountBoxIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>{username} | {email} </ListItemText>
            </ListItem>
        </List>
      </CSDiv>
    )
}

export default function ListUsers() {

    const [listData, setListData] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:4000/account/list', {withCredentials: true})
        .then((res) => {
            setListData(res.data);
        });
    }, [])

  return (
    <Container sx={{marginTop: 10}}>
        {listData.map((u_item, i) => {
            return <UserCard key={i} name={u_item.username} email={u_item.email} />
        })}
        
    </Container>
  );
}