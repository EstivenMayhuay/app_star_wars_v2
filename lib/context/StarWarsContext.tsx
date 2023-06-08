import { Person } from "@/interfaces/Person";
import { Planet } from "@/interfaces/Planet";
import { Vehicle } from "@/interfaces/Vehicle";
import { createContext, useEffect, useState } from "react";

interface StarWarsType {
    people: Person[],
    isError: boolean,
    isLoading: boolean,
    countPage: number,
    titlePage: string,
    updateTitlePage: (value: string) => void,
    backHeader: boolean,
    setBackHeader: (value: boolean) => void,
    hideListPeople: boolean,
    setHideListPeople: (value: boolean) => void,
}

export const StarWarsContext = createContext<StarWarsType | undefined>(undefined);

const getCountPage = async() => {
    const res = await fetch('https://swapi.dev/api/people');
    const data = await res.json();
    return Math.ceil(data.count / data.results.length);
}

const getHome = async(url_homeworld: string) => {
    const res = await fetch(url_homeworld);
    const data = await res.json();
    const planet: Planet = {
        name: data.name
    }
    return planet;
}

const getVehicles = async (arrVehicles: string[]) => {
    let vehicles_obj_arr = [];
    
    for (const vehicleObj of arrVehicles) {
        const res = await fetch(vehicleObj);
        const data = await res.json();
        const vehicle: Vehicle = {
            name: data.name
        }
        
        vehicles_obj_arr.push(vehicle);
    }
    
    return vehicles_obj_arr
}

export function StarWarsContextProvider({children}: {children: any}) {
    const [people, setPeople] = useState<Person[]>([]);
    const [isError, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [countPage, setCountPage] = useState(1);
    const [titlePage, setTitlePage] = useState("People of Star Wars");
    const [hideListPeople, setHideListPeople] = useState(false);
    const [backHeader, setBackHeader] = useState(true);

    const updateTitlePage = (value: string) => setTitlePage(value)
    
    useEffect(() => {
        const getCharacters = async () => {
            try {
                const number_page = await getCountPage();

                if(countPage <= number_page){
                    const res = await fetch(`https://swapi.dev/api/people/?page=${countPage}`, {cache: "no-cache"});
                    const data = await res.json();
                    
                    for (const p of data.results) {
                        const person: Person = {
                            name: p.name,
                            type: p.gender === "female" || p.gender === "male" ? "Human" : "Droid",
                            hair_color: p.hair_color,
                            eye_color: p.eye_color,
                            skin_color: p.skin_color,
                            birth_year: p.birth_year,
                            home: await getHome(p.homeworld),
                            vehicles: await getVehicles(p.vehicles)
                        }                   

                        setIsLoading(false);
                        setPeople(prev => [...prev, person]);
                    }

                    setCountPage(countPage + 1);
                    setIsLoading(false);
                    setError(false);    
                }
            }
            catch(error) {
                setError(true)
                setIsLoading(false);
                console.log(error);
            }
        }
        
        getCharacters();
    }, [countPage])

    return (
        <StarWarsContext.Provider value={{people, isError, isLoading, countPage, titlePage, updateTitlePage, backHeader, setBackHeader, hideListPeople, setHideListPeople}}>
            {children}
        </StarWarsContext.Provider>
    )
}