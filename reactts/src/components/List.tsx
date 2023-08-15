import { Sub } from "../types"

interface Props {
    subs: Array<Sub>
}

const List = ({ subs }: Props) => {

    const renderList = (): JSX.Element[] => {
        const elements = subs.map((sub) => {
            return (
                <li key={sub.nick}>
                    <img src={sub.avatar} alt={sub.nick} />
                    <h4>{sub.nick} (<small>Subscribed for {sub.subMonths} months</small>)</h4>
                    <small>{sub.description?.substring(0, 100)}</small>
                </li>
            )
        })
        return elements
    }

    return (
        <ul>
            {renderList()}
        </ul>
    )
}

export default List