
import { useNewSubForm } from "../hooks/useNewSubForm"
import { Sub } from "../types"

interface FormProps {
    onNewSub: (newSub: Sub) => void

}


export default function Form({ onNewSub }: FormProps) {

    // const [inputValues, setInputValues] = useState<FormState["inputValues"]>(INITIAL_STATE)

    const { formState, handleInputChange, handleClearInputValues } = useNewSubForm()
    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        onNewSub(formState)
        handleClearList()
    }
    const handleChange = (e:
        React.ChangeEvent<HTMLInputElement> |
        React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const { name: inputName, value: inputValue } = e.target
        handleInputChange({ inputName, inputValue })
    }
    function handleClearList(): void {
        handleClearInputValues()
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} value={formState.nick} type="text" placeholder="nick" name="nick" />
                <input onChange={handleChange} value={formState.subMonths} type="number" placeholder="subMonths" name="subMonths" />
                <input onChange={handleChange} value={formState.avatar} type="text" placeholder="avatar" name="avatar" />
                <textarea onChange={handleChange} value={formState.description} placeholder="description" name="description" />
                <button type="submit">Save new sub</button>
                <button type="button" onClick={handleClearList}>Clear List</button>

            </form>
        </div>
    )
}