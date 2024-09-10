import {create} from 'zustand'


/**
 * This is a global store using zustand. It contains the state of the selected chat 
 * and the messages of the selected chat. The setSelectedChats and setMessages functions
 * are used to update the state of the store.
 * 
 * @returns {Object} An object containing the state and functions to update the state.
 */
const useMessagesStore=create((set)=>(
    {
        selectedChats:null,
        setSelectedChats:(selectedChats)=>set({selectedChats}),
        messages:[],
        setMessages:(messages)=>set({messages})
    }
))

export default useMessagesStore
