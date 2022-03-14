import React from 'react'
import { auth } from '../fbase'
import genericPFP from '../img/genericPFP.jpg'

function ChatMessage(props) {

    const { text, uid, photoURL } = props.message;

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

    return (
        <div className={`message ${messageClass}`}>
            <img className="userPhoto" src={photoURL || genericPFP} />
            <p className={`text ${messageClass}`}>{text}</p>
        </div>
    );
}

export default ChatMessage