"use client"

import { createContext, useContext, useState } from "react";

type channelContextType = {
    selectedChannel: string;
    setSelectedChannel: (channel: string) => void
}

const ChannelContext = createContext<channelContextType | undefined>(undefined);

export function ChannelProvider({ children }: { children: React.ReactNode }) {
    const [selectedChannel, setSelectedChannel] = useState('');

    return (
        <ChannelContext.Provider value={{ selectedChannel, setSelectedChannel }}>
            {children}
        </ChannelContext.Provider>
    )
}

export function useChannel() {
    const context = useContext(ChannelContext);
    if (!context) throw new Error('useChannel must be used within ChannelProvider');
    return context
}