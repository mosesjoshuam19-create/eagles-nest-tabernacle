
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLiveChat } from '@/hooks/useLiveChat';
import { format } from 'date-fns';

const LiveChat = () => {
  const [inputMessage, setInputMessage] = useState('');
  const { messages, loading, sendMessage, isAuthenticated } = useLiveChat();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await sendMessage(inputMessage);
    if (success) {
      setInputMessage('');
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Live Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading chat...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Live Chat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-100 rounded-lg p-4 h-64 overflow-y-auto mb-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-gray-500">No messages yet. Be the first to say hello!</p>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white p-2 rounded shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-medium text-blue-600">{msg.username}:</span>
                      <span className="ml-2">{msg.message}</span>
                    </div>
                    <span className="text-xs text-gray-400 ml-2">
                      {format(new Date(msg.created_at), 'HH:mm')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input 
            type="text" 
            placeholder={isAuthenticated ? "Type your message..." : "Please log in to chat"}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            disabled={!isAuthenticated}
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          />
          <Button type="submit" disabled={!isAuthenticated || !inputMessage.trim()}>
            Send
          </Button>
        </form>
        {!isAuthenticated && (
          <p className="text-sm text-gray-500 mt-2">
            <a href="/login" className="text-blue-600 hover:underline">Log in</a> to participate in the chat
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveChat;
