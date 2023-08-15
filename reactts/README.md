# React TS

1. Las de lógica de negocio → Separadas en un archivo aparte ******************************types.d.ts******************************
    1. Solo permite ********************************************idefiniciones y tipos******************************************** 
    2. NO se pueden poner funciones o cosas por el estilo 
2. Lógica de estados ( Aquellas pertenecientes de componentes )
</aside>

- Interfaz utilizadas para los ejemplos y código del repo
    - Sub
        
        ```jsx
        export interface Sub {
          nick: string,
          subMonths: number,
          avatar: string,
          description?: string
        }
        ```
        
- *Tipado de useState*
    - ******************************************useState tipo inferido******************************************
        
        > *******************************************Infiere de forma automatica que el tipo es ************number, así lo hace con otros tipos como el de string*************
        > 
        
        ```jsx
        const [count, setCount] = useState(5)
        ```
        
    - *useState con Generico o tipo especificado*
        
        > *Se especifica el tipo dentro del **<>***
        > 
        
        ```jsx
        const [count, setCount] = useState<number>(5)
        ```
        
    - *A partir del valor de un objeto typeof keyof typeof*
        1. Delimitamos a nuestro useState a que solo pueda tomar valores relacionados a los que se declaran en un objeto 
        2. Debemos específicar de igual forma como “tipo genérico” que valores puede tomar
        3. De esta forma podemos utilizarlo con el setState
        
        <aside>
        💡 Se juntan los elementos para ejemplificar, pero todos van en su archivo correspondeinte
        
        </aside>
        
        ```jsx
        //ARCHIVO consts.ts
        export const TODO_FILTERS = {
          ALL: 'all',
          COMPLETED: 'completed',
          ACTIVE: 'active'
        } as const
        
        //ARCHIVO types.d.ts
        export type FilterValue = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
        
        //ARCHIVO <Lugar donde lo utilizaremos>.jsx
        const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)
          const handleFilterChanged = (filter: FilterValue): void => {
            setFilterSelected(filter)
          }
        ```
        
        - Compilación de los tipos:
            
            ```jsx
            export const TODO_FILTERS = {
              ALL: 'all',
              COMPLETED: 'completed',
              ACTIVE: 'active'
            } as const
            export type FilterValue = typeof TODO_FILTERS
            // const soloTypeOf : FilterValue = 
            // {
            //   ALL: string,
            //   COMPLETED: string,
            //   ACTIVE: string
            // } 
            type TypeOfKeysOfTypeof = typeof TODO_FILTERS[keyof typeof TODO_FILTERS]
            const typeOfKeysOf : TypeOfKeysOfTypeof = "all" // "all" | "completed" || "active"
            ```
            
- *Pasando propiedades a un componente*
    
    ```jsx
    import { Sub } from "../App"
    
    📌 interface ListProps { 
        subs : Array<Sub>
    }
    
    📌 ***export default function List({ subs }: ListProps)*** {
    	...
    }
    ```
    
    1. 📌 ***Indicamos mediante una interfaz** el tipo de propiedades que puede recibir*
- *Pasando el setState como una prop ************************NO es recomendable*************************
    1. En App realizamos la declaración de un useState y en este mismo hacemos uso del componente ***Form***
    2. En el componente ***Form indicamos que esperamos recibir como prop la función del useState***
    
    ```jsx
    ***COMPONENTE APP 📌1***
    const [subs, setSubs] = useState<AppState["subs"]>([])
    <Form onNewSub={setSubs} />
    |
    |
    |-
    \|/
    	************COMPONENTE FORM 📌2************
    	interface FormProps {
    	    ***onNewSub: React.Dispatch<React.SetStateAction<Sub[]>>***
    	}
    ```
    
- 

> ***Solo cuando realemnte queremos que nuestro componente admita children en su funcionamiento*** 
Solo funciona en componentes de ***ArrowFunction***
> 
> - *Utilizando Children , aceptando Children*
>     
>     **************Forma 1**************
>     
>     ```jsx
>     import React from "react"
>     import { Sub } from "../App"
>     
>     interface Props {
>         subs: Array<Sub>,
>         ***children?: React.ReactNode***
>     }
>     
>     const List = ({ subs }: Props) => {
>     ...
>     }
>     
>     export default List
>     ```
>     
>     ***************************************************Tipos de Children***************************************************
>     
>     - `ReactElement` is useful for parsing children with utilities like `React.Children.forEach`
>     - `JSX.Element` is the type that TypeScript infers and applies as a default to JSX React elements.
>     - `ReactNode` is used for most other cases
>     

> Se utiliza cuando tenemos una función o metodo que devuelve un arreglo de elementos JSX
> 
> - Renderizando Lista de elementos JSX | TSX
>     
>     📌 *************************Indicamos que esperamos un arreglo de elementos JSX, gracias a ********map******** obtenemos un nuevo arreglo*
>     
>     ```jsx
>     const renderList = (): ***JSX.Element[] 📌*** => {
>             return subs.map((sub) => {
>                 return (
>                     <li key={sub.nick}>
>     									...
>     									...
>                     </li>
>                 )
>             })
>         }
>     ```
>     

### Eventos en formulario

<aside>
💡 El manejo de los tipos es mas sencillo aplicando la técnica ******************hover****************** osea poner el mouse donde estamos ocupando dicho parametro o de donde mandamos, dado que ese será el contexto adecuado y TS generalmente lo puede inferir

1. Aquí estamos mandando el evento a la función **handleChange**
    
    ```jsx
    <input onChange={evt => handleChange(evt)} value={inputValues.nick} type="text" placeholder="nick" name="nick" />
    ```
    
2. Si hacemos hover sobre el ***evt** nos indica que tipo tiene*
    - ***img***
        
        ![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/2b30d4c4-71ee-4e3e-8334-dc531baa0179/Untitled.png)
        
</aside>

- Evento de un Input
    
    ```jsx
    **const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {**
            setInputValues({
                ...inputValues,
                [e.target.name]: e.target.value
            })
        }
    ```
    

> ********************************Utilizando useRef********************************
> 
- *Tipando useRef*
    - Nuevamente podemos utilizar la técnica de hover ( [El manejo de los tipos es mas sencillo aplicando la técnica ******************hover****************** osea poner el mouse donde estamos ocupando dicho parametro o de donde mandamos, dado que ese será el contexto adecuado y TS generalmente lo puede inferir](https://www.notion.so/El-manejo-de-los-tipos-es-mas-sencillo-aplicando-la-t-cnica-hover-osea-poner-el-mouse-donde-estamos--1951d74529f5404eb8bd7a721460a3f2?pvs=21)), dado que ****************************************************dejando el mouse sobre la etiqueta nos dice inmediatamente el tipo con el cual estamos tratando****************************************************
    - *📌 Es recomentable inicializarlo en null, ya que previo a cargar la referencia este es el valor que tendrí apor defecto inicial*
    
    ```jsx
    const divRef = useRef<HTMLDivElement>(null📌)
    
    ```
    

### Reducer

- *Ejemplo Reducer 1*
    1. Por conveniencia se crea un customHook para el manejo del reducer
    2. Establecemos como se verá nuestro InitialState
    3. Creamos nuestro reducer (recibe el state y el action)
        1. action lo establecemos de tipo Action, esto con el objetivo de controlar lo que estaremos aceptando dependiendo de la acción que vaya a tomar
        2. state será del tipo state que hayamos determinado
    
    ```jsx
    const initialState: State = {
      fromLanguage: 'auto',
      toLanguage: 'en',
      fromText: 'Type something',
      result: '',
      isLoading: false
    }
    
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    function reducer (state: State, action: Action) {
      const { type } = action
      switch (type) {
        case 'INETERCHANGE_LANGUAGE':
          return {
            ...state,
            fromLanguage: state.toLanguage,
            toLanguage: state.fromLanguage
          }
        case 'SET_FROM_LANGUAGE':
          return {
            ...state,
            fromLanguage: action.payload
          }
        default:
          return state
      }
    }
    ```
    
    - Archivo donde establecemos los tipos de datos
        - **Action** esta mediante el operador **union** de typescript
        - Dependiendo el **type** establecemos que tipo de **payload** esperamos recibir
            1.  **INETERCHANGE_LANGUAGE al no especificar que recibe un paylaod hacer esto: `action.payload` marcaría error** 
    
    ```jsx
    export interface State {
      fromLanguage: string
      toLanguage: string
      fromText: string
      result: string
      isLoading: boolean
    }
    
    export type Action =
    | { type: 'INETERCHANGE_LANGUAGE' }
    | { type: 'SET_FROM_LANGUAGE', payload: string }
    | { type: 'SET_TO_LANGUAGE', payload: string }
    | { type: 'SET_FROM_TEXT', payload: string }
    | { type: 'SET_RESULT', payload: string }
    ```
    
- *Ejemplo Reducer 2*
    
    ***Interfaz Sub:  [Interfaz utilizadas para los ejemplos y código del repo](https://www.notion.so/Interfaz-utilizadas-para-los-ejemplos-y-c-digo-del-repo-2410396a699f42f9ba1c71f844be95fa?pvs=21)*** 
    
    > 📌[********keyof <Type | Object> utiliza extends en función********](https://www.notion.so/keyof-Type-Object-utiliza-extends-en-funci-n-20987392e5b04dae81f55d528dd35a8d?pvs=21) 📌
    > 
    
    > *🪨**`as keyof Sub`** es una técnica llamada **type assertion** o **casting** en TypeScript. Significa que estás indicando al compilador de TypeScript que consideres  **`e.target.name`** como una clave válida para el tipo **`Sub`**. Esto es útil para trabajar con objetos y tipos más específicos.🪨 
    Osea: `nick , subMonths, avatar, description`*
    > 
    
    ```jsx
    const INITIAL_STATE = {
        nick: "",
        subMonths: 0,
        avatar: "",
        description: ""
    }
    
    type FormReduceAction = {
        type: "CHANGE_INPUT_VALUE" | "CLEAR_INPUT_VALUES"
        payload: {
            ***📌 inputName: keyof Sub 📌***
            inputValue: string | number
        }
    } | {
        type: "CLEAR_INPUT_VALUES"
    }
    
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
    
    const handleChange = (e:
            React.ChangeEvent<HTMLInputElement> |
            React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            dispatch({
                type: "CHANGE_INPUT_VALUE",
                payload: {
                    **🪨 inputName: e.target.name as keyof Sub, 🪨** 
                    inputValue: e.target.value
                }
            })
        }
    ```
    

### Llamada de fetch

- *Ejemplo*
    
    > ***📌1**
    Realizamos el Fetch y declaramos que estamos esperando una respuesta del tipo promesa con la estructura de datos esperada por parte del API*
    > 
    > - Tipo API
    >     
    >     ```jsx
    >     export type SubsResponseFromApi = Array<{
    >       nick: string,
    >       subMonths: string,
    >       profileUrl: string,
    >       description: string
    >     }>
    >     ```
    >     
    > 
    > Con respecto al tipo que estamos manejando presenta el problema de que nosotros ************************************tipamos “avatar” , pero recibimos “profileURL” es por eso que vamos a 📌2************************************
    > 
    
    > ***📌2**
    Creamos una función que recibe la respuesta que brinda la API, así mismo indicamos que devuelve un arreglo del tipo que nosotros hemos mandejado, realizamos ******************************************************************************************************************map para modificar aquellos campos que no coinciden con los nuestros*******************************************************************************************************************
    > 
    
    > ***📌3**
    Realizamos el termino de la llamada a fetch, invocamos el metodo y ahora si es posible obtener y hacer set de los datos recibidos*
    > 
    
    ```jsx
    useEffect(() => {
        setLoading(true)
    📌1    **const fetchSubs = (): Promise<SubsResponseFromApi> => {
          return fetch("./db/mockResponse.json").then(res => {
            return res.json()
          })
        }**
    
    📌2    **const mapFromApiToSubs = (subsFromApi: SubsResponseFromApi): Array<Sub> => {
          return subsFromApi.map(sub => {
            return {
              nick: sub.nick,
              subMonths: + sub.subMonths,
              avatar: sub.profileUrl,
              description: sub.description
            }
          })
        }**
    
    📌3    **fetchSubs().then(data => {
          const subs = mapFromApiToSubs(data)
          setSubs(subs)
          setSubsCounter(data.length)
        })**
    
        setTimeout(() => {
    
          setLoading(false)
        }, 1500);
    
        return () => {
          // console.log('cleanup');
        }
      }, [])
    ```
    
-