import {create} from 'zustand'

const useMessagesStore=create((set)=>(
    {
        selectedChats:null,
        setSelectedChats:(selectedChats)=>set({selectedChats}),
        messages:[],
        setMessages:(messages)=>set({messages})
    }
))

export default useMessagesStore