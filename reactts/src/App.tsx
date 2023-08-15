import { useRef, useState } from 'react'
import './App.css'
import Form from './components/Form'
import List from './components/List'
import useGetSubs from './hooks/useGetSubs'
import { Sub } from './types'

export interface AppState {
  subs: Array<Sub>,
  loading: boolean,
  newSubsNumber: number
}

function App() {

  const { subs, loading, addNewSub } = useGetSubs()
  const [subsCounter, setSubsCounter] = useState<AppState["newSubsNumber"]>(0)
  const divRef = useRef<HTMLDivElement>(null)


  const handleNewSub = (newSub: Sub): void => {
    addNewSub(newSub)
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
