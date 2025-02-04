import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import Header from './Header';
import MessageList from './MessageList';
import { useAuthStore } from '../store/useAuthStore';
import moment from 'moment';

function ChatContainer() {
  const { messages, getMessages, isMessageLoading, selectedUser, subsribeToMessages, unSubscribeMessage } = useChatStore();
  const { authUser } = useAuthStore();
  const bottomRef = useRef(null);
  const [prevMessageCount, setPrevMessageCount] = useState(0); // Track previous message count

  useEffect(() => {
    getMessages(selectedUser._id);
    subsribeToMessages();

    return () => unSubscribeMessage();
  }, [selectedUser._id, getMessages,messages, subsribeToMessages, unSubscribeMessage]);

  useEffect(() => {
    // Check if new messages have been added
    if (messages.length > prevMessageCount && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Update the previous message count
    setPrevMessageCount(messages.length);
  }, [messages, prevMessageCount]);

  if (isMessageLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
      <Header />

      {/* Message section */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4'>
        {messages.map((message) => (
          <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                      : selectedUser.profilePic || 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg'
                  }
                  alt=''
                />
              </div>
            </div>
            <div className='chat-header mb-1'>
              <time className='text-xs opacity-50 ml-1'>{moment(message.createdAt).format('HH:mm')}</time>
            </div>
            <div className='flex flex-col chat-bubble'>
              {message.image && <img src={message.image} className='rounded-md mb-2 sm:max-w-[200px]' alt='' />}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* Footer */}
      <MessageList />
    </div>
  );
}

export default ChatContainer;