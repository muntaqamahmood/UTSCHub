import styled from "styled-components";

import { ChannelHeader, MessageList, MessageInput } from "stream-chat-react";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    background: white;

    str-chat__header-livestream {
        width: 100%;
        height: 70px;
    }

    .str-chat__list {
        height: calc(100vh - 70px - 50px);
    }

    .str-chat__message-input {
        position: sticky;
        bottom: 20px;
        width: 100%;
        height: 60px;
    }
`;

export default function ChannelBody() {
    return(
        <Container>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
        </Container>
    );
}