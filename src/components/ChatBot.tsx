// components/ChatBot.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function ChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const handleSend = () => {
    if (!input && !image && !audio) return;

    const newMessage = {
      text: input,
      image: image ? URL.createObjectURL(image) : null,
      audio: audio ? URL.createObjectURL(audio) : null,
    };

    setMessages([...messages, newMessage]);
    setInput("");
    setImage(null);
    setAudio(null);
  };

  return (
    <div className="max-w-xl mx-auto p-4 space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
        {messages.map((msg, index) => (
          <div key={index} className="border p-2 rounded-md">
            {msg.text && <p className="mb-2">{msg.text}</p>}
            {msg.image && (
              <img
                src={msg.image}
                alt="Uploaded"
                className="w-full max-w-xs rounded-md"
              />
            )}
            {msg.audio && (
              <audio controls className="mt-2">
                <source src={msg.audio} type="audio/mpeg" />
                Your browser does not support the audio tag.
              </audio>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <Textarea
          placeholder="Ask something..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
          <Input
            type="file"
            accept="audio/*"
            onChange={(e) => setAudio(e.target.files?.[0] || null)}
          />
        </div>

        <Button onClick={handleSend} className="w-full mt-2">
          Send
        </Button>
      </div>
    </div>
  );
}
