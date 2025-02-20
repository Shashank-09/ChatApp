import useConversation from "../statemanage/useConversation"
import axios from "axios"
import {useEffect  , useState} from "react"


const useGetMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages  , setMessage , selectedConversation} = useConversation()
  
  useEffect(() => {
    const getMessage = async () => {
        setLoading(true)
        if(selectedConversation && selectedConversation._id){
            try {
                const res = await axios.get(
                    `/api/message/get/${selectedConversation._id}`
                )
                setMessage(res.data)
                setLoading(false)
            } catch (error) {
                console.log("Error in getting messages", error);
                setLoading(false);
            }
        }
    }
    getMessage()
  }, [selectedConversation , setMessage])
  return {loading , messages}
  
}


export default useGetMessage