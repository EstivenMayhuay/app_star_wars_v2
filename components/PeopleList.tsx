import { useContext, useEffect, useState } from "react";
import { StarWarsContext } from "@/lib/context/StarWarsContext";
import LoadingIndicator from "./LoadingIndicator";
import PersonItem from "./PersonItem";
import { Person } from "@/interfaces/Person";

export default function PeopleList () {
    const data = useContext(StarWarsContext);
    const [currPerson, setCurrPerson] = useState<Person | undefined>(undefined);

    const handleSetPerson = (personObj: Person) => {
        setCurrPerson(personObj);
        data?.setHideListPeople(true);
        data?.setBackHeader(false);
        data?.updateTitlePage(personObj.name);
    }

    useEffect(() => {
        data?.updateTitlePage("People");        
    }, [])
    
    if(data?.isError) return <h1 className="p-4 text-red-500 size-17 font-bold text-center">Failed to Load Data</h1>

    if(data?.isLoading) return <LoadingIndicator />

    return (
        <div className="grid grid-cols-12">
            <ul className={`menuPeople col-span-3 bg-white lg:h-screen overflow-hidden overflow-y-scroll lg:border-r-2 lg:border-gray-100 ${data?.hideListPeople ? 'lg:hidden': ''}]}`}>
                {
                    data?.people.map((person, index) => (
                        <li key={index}>
                            <PersonItem person={person} onclick={handleSetPerson}  /> 
                        </li>
                    ))
                }
            </ul>

            <div className={`contentInfo col-span-9 bg-white lg:py-4 lg:px-10 ${data?.hideListPeople ? false : true}`}>
                <div className="contentInfo__title pt-8 pl-4 pb-2">
                    <h2 className="size-17 font-bold color-ranv-text-dark">General Information</h2>
                </div>
                <ul className="px-4">
                    <li className="py-4 border-b-2 border-gray-100 size-17 flex justify-between">
                        <span className="color-ranv-text-light font-bold">Eye Color</span>
                        <span className="font-bold">{currPerson && currPerson.eye_color}</span>
                    </li>
                    <li className="py-4 border-b-2 border-gray-100 size-17 flex justify-between">
                        <span className="color-ranv-text-light font-bold">Hair Color</span>
                        <span className="font-bold">{currPerson && currPerson.hair_color}</span>
                    </li>
                    <li className="py-4 border-b-2 border-gray-100 size-17 flex justify-between">
                        <span className="color-ranv-text-light font-bold">Skin Color</span>
                        <span className="font-bold">{currPerson && currPerson.skin_color}</span>
                    </li>
                    <li className="py-4 border-b-2 border-gray-100 size-17 flex justify-between">
                        <span className="color-ranv-text-light font-bold">Birth Year</span>
                        <span className="font-bold">{currPerson && currPerson.birth_year}</span>
                    </li>
                </ul>

                <div className="contentInfo__title pt-8 pl-4 pb-2">
                    <h2 className="size-17 font-bold color-ranv-text-dark">Vehicles</h2>

                    <ul>
                        {currPerson && currPerson.vehicles.map((vehicle, index) => (
                            <li key={index} className="py-4 border-b-2 border-gray-100 size-17 flex justify-between">
                                <span className="color-ranv-text-light font-bold">{vehicle.name}</span>
                            </li>                        
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}