import '@fortawesome/fontawesome-svg-core/styles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { Person } from "@/interfaces/Person"


interface PersonItemProps {
    person: Person,
    onclick: (personObj: Person) => void
}

export default function PersonItem ({person, onclick}: PersonItemProps) {
    const handleSetPerson = () => {
        onclick(person);
    }

    return (
        <div className="item flex p-4 border-b-2 border-gray-100 relative">
            <div className="item__info">
                <h1 className="size-17 color-ranv-text-dark font-bold">{person?.name}</h1>
                <p className='color-ranv-text-light'>{person?.type} from {person?.home.name}</p>
            </div>
            <div className="item__button absolute right-4 top-0 flex items-center justify-center h-full" style={{cursor: 'pointer'}}>
                <button onClick={handleSetPerson}><FontAwesomeIcon icon={faChevronRight} size='lg' /></button>
            </div>
        </div>
    )
}