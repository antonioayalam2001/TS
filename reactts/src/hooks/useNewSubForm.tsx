import { useCallback, useReducer } from "react"
import { Sub } from "../types"
interface FormState {
    inputValues: Sub
}
const INITIAL_STATE = {
    nick: "",
    subMonths: 0,
    avatar: "",
    description: ""
}
type ChangeInputValue = {
    type: "CHANGE_INPUT_VALUE" | "CLEAR_INPUT_VALUES"
    payload: {
        inputName: keyof Sub | string
        inputValue: string | number
    }
}
type ClearInputValuesAction = {
    type: "CLEAR_INPUT_VALUES"
}
type FormReduceAction = ChangeInputValue | ClearInputValuesAction
const formReducer = (state: FormState["inputValues"], action: FormReduceAction) => {
    switch (action.type) {
        case "CHANGE_INPUT_VALUE": {
            const { inputName, inputValue } = action.payload //destructuring
            return {
                ...state,
                [inputName]: inputValue
            }
        }
        case "CLEAR_INPUT_VALUES":
            return INITIAL_STATE
    }
}
export const useNewSubForm = () => {
    const [formState, dispatch] = useReducer(formReducer, INITIAL_STATE)

    const handleInputChange = useCallback(({ inputName, inputValue }: ChangeInputValue["payload"]) => {
        dispatch({
            type: "CHANGE_INPUT_VALUE",
            payload: {
                inputName: inputName as keyof Sub,
                inputValue: inputValue
            }
        })
    }, [])

    const handleClearInputValues = useCallback(
        () => {
            dispatch({
                type: "CLEAR_INPUT_VALUES"
            })
        },
        [],
    )
    return {
        formState,
        handleInputChange,
        handleClearInputValues
    }
}