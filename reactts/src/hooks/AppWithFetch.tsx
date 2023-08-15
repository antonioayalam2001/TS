import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Sub, SubsResponseFromApi } from '../types'
import List from '../components/List'
import Form from '../components/Form'


interface AppState {
  subs: Array<Sub>,
  loading: boolean,
  newSubsNumber: number
}

function App() {
  const [subs, setSubs] = useState<AppState["subs"]>([])
  const [loading, setLoading] = useState<AppState["loading"]>(false)
  const [subsCounter, setSubsCounter] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setLoading(true)
    const fetchSubs = (): Promise<SubsResponseFromApi> => {
      return fetch("./db/mockResponse.json").then(res => {
        return res.json()
      })
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

    fetchSubs().then(data => {
      const subs = mapFromApiToSubs(data)
      setSubs(subs)
      setSubsCounter(data.length)
    })

    setTimeout(() => {

      setLoading(false)
    }, 1500);

    return () => {
      // console.log('cleanup');
    }
  }, [])

  const handleNewSub = (newSub: Sub): void => {
    setSubs(prev => [...prev, newSub])
    setSubsCounter(prev => prev + 1)
  }

  return (
    <>
      {loading ?
        (<h1> Loading...</h1 >) :
        (<div className='App' ref={divRef}>
          <h1>Subs Info</h1>
          <List subs={subs} />
          <h4>New Subs: {subsCounter}</h4>
          <Form onNewSub={handleNewSub} />
        </div>)
      }
    </>
  )
}

export default App
