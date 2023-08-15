import { useEffect, useState } from "react";
import { AppState } from "../App";
import { getAllSubs } from "../services/getAllSubs";
import { Sub } from "../types";

export default function useGetSubs() {
    const [subs, setSubs] = useState<AppState["subs"]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {
            getAllSubs().then(subs => {
                setSubs(subs)
                setLoading(false)
            })
        }, 1500);
        return () => {
            // console.log('cleanup');
        }
    }, [])

    const addNewSub = (newSub : Sub) => { 
        setSubs([...subs, newSub])

    }

    return { subs, loading, addNewSub }
}
