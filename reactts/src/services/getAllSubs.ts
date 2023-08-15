import axios from "axios"
import { Sub, SubsResponseFromApi } from "../types"


export const getAllSubs = async () => { 
    const subsFromApi = await axiosRequest()
    return mapFromApiToSubs(subsFromApi)
}


const axiosRequest = async (): Promise<SubsResponseFromApi> => {
    const res = await axios.get("./db/mockResponse.json")
    return res.data
}

const mapFromApiToSubs = (subsFromApi: SubsResponseFromApi): Array<Sub> => {
    return subsFromApi.map(sub => {
        return {
            nick: sub.nick,
            subMonths: + sub.subMonths,
            avatar: sub.profileUrl,
            description: sub.description
        }
    })
}
