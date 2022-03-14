import React, { useState, useEffect } from 'react'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { db, auth } from '../fbase'
import firebase from 'firebase/compat/app'
import user from './Home'
import ChatMessage from './ChatMessage'

function ChatRoom({isDark}) {

  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {

    console.log("Hello");

    e.preventDefault();

    const {uid, photoURL, displayName, email, phoneNumber } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid, 
      photoURL,
      displayName,
      email,
      phoneNumber
    })

    // Reset formValue
    setFormValue('');

  }


  return (
    <div>

    <div className="main">

      <div className="mt-20">
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>

    </div>

    <form onSubmit={sendMessage} className="flex text-lg h-12 fixed bottom-0 bg-[#181717] w-full">

      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} className="text-white px-3 leading-6 w-full text-lg dark:bg-[#3a3a3a] bg-gray-200 shadow-xl dark:shadow-none border-none outline-none" />
      <button type="submit" className="w-1/5 dark:bg-[#38388f] bg-gradient-to-r from-purple-500 to-pink-500">
        { isDark ? '🕊️' : '🚀'}
      </button>

    </form>

    </div>
  )
}

export default ChatRoom