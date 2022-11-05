import { getUser, getToken } from "../../Utils/Common";
import axios from 'axios';

export const getComments = async (Comments) => {  
    return Comments
};
  
  export const createComment = async (text, parentId = null, currentPostId) => {
    const body = {
      body: text,
      parentId,
      userId: getToken(),
      username: getUser(),
      itemId: currentPostId,
      createdAt: new Date().toISOString(),
    };

    let axiosConfig = {
      headers: {
          'x-auth-token': getToken(),
      }
    };

    axios.post('http://localhost:8000/api/comments/', body, axiosConfig)
    .then(res =>{
      console.log(res);
    }).catch(error =>{
      console.error(error);
    })

    return body;
    /*
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: "1",
      username: "John",
      createdAt: new Date().toISOString(),
    };*/
  };
  
  export const updateComment = async (text) => {
    return { text };
  };
  
  export const deleteComment = async () => {
    return {};
  };