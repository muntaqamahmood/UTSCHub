import styled from "styled-components";
import { ChannelList, useChatContext } from "stream-chat-react";
import ChannelListContainer from "./ChannelListContainer";
import { useEffect, useState } from "react";
import { getUserId } from "../Utils/Common";

const Container = styled.div`
    height: 100vh;
    background-color: #333;
    padding: 20px 10px;
    
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h2{
            color: white;
            margin: 0 0 10px;
            font-size: 16px;
        }
        
        button {
            color: white;
            font-size: 20px;
            background: none;
            border: none;
            cursor: pointer;
        }
    }

    .str-chat {
        height: max-content;
        &.str-chat-channel-list {
            float: none;
        }
    }

    .channel-list {
        width: 100%;
        &_message {
            color: white;
        }
    }
`;

const randomStr = () => Math.random().toString(36).substring(7);

export default function CustomChannelList({onClickAdd}) {

    const userId = getUserId();

    const [channelListKey, setChannelListKey] = useState(randomStr());
    const filters = { members: { $in: [userId] } }
    const sort = { last_message_at: -1 }
    const {client} = useChatContext()

    useEffect(() => {
        client.on("member.added", () => {
            setChannelListKey(randomStr());
        })
    },[])

    return(
        <Container>
            <div className="header">
                <h2>Channels</h2>
                <button onClick={onClickAdd}>+</button>
            </div>
            <ChannelList 
                key={channelListKey}
                list={(listProps) => <ChannelListContainer {... listProps} />}
                filters={filters}
                sort={sort}
            />
        </Container>
    );
};