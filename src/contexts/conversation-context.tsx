"use client"

import { createContext, useContext, useState } from "react";

type conversationContextType = {
  selectedConversation: { title: string; id: number };
  setSelectedConversation: React.Dispatch<React.SetStateAction<{ title: string; id: number }>>;
};

const ConversationContext = createContext<conversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: React.ReactNode }) {
  const [selectedConversation, setSelectedConversation] = useState({
    title: "",
    id: 0,
  });

  return (
    <ConversationContext.Provider
      value={{ selectedConversation, setSelectedConversation }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
    const context = useContext(ConversationContext);
    if (!context) throw new Error('useChannel must be used within Category Provider');
    return context
}