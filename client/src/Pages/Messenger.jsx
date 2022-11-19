import React, { useEffect, useState } from 'react';
import { getUser, getUserId } from '../Utils/Common';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  LoadingIndicator,
} from 'stream-chat-react';
import icon from "../Components/comments/user-icon.png";
import '@stream-io/stream-chat-css/dist/css/index.css';
import styled from 'styled-components';
import CustomChannelList from '../Components/CustomChannelList';
import ChannelBody from '../Components/ChannelBody';
import AddingChannel from '../Components/AddingChannel';

const Container = styled.div`
  display: flex;
  .left-column {
    width: 300px;
  }

  .right-column {
    flex: 1;
  }
`

const apiKey = process.env.REACT_APP_STREAM_API_KEY;

const userId = getUserId();

const user = {
  id: userId,
  name: getUser(),
  image: icon,
}

  
export default function Message() {
  const [client, setClient] = useState(null);

  const [addingTeamChannel, setAddingTeamChannel] = useState(false);

  useEffect(() => {
    async function init() {
      const chatClient = StreamChat.getInstance(apiKey)

      await chatClient.connectUser(user, chatClient.devToken(user.id))

      setClient(chatClient)
    }

    init()

    if (client) return () => client.disconnectUser();
  }, [])

  if(!client) return <LoadingIndicator />


  return (
    <div>
      <Chat client={client} theme="messaging light">
        <Container>
          <div className="left-column">
            <CustomChannelList onClickAdd={() => setAddingTeamChannel(true)} />
          </div>
          <div className="right-column">
            <Channel>
              {addingTeamChannel ? (<AddingChannel onClose={() => setAddingTeamChannel(false)}/>) : (<ChannelBody />)}
            </Channel>
          </div>
        </Container>
      </Chat>
    </div>
  )
}
  
