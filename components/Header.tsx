'use client'

import { StarWarsContext } from "@/lib/context/StarWarsContext";
import '@fortawesome/fontawesome-svg-core/styles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { useContext, useEffect } from "react";

export default function Header () {
    const data = useContext(StarWarsContext);

    const handleBack = () => {
        data?.updateTitlePage("People");
        data?.setHideListPeople(false);
        data?.setBackHeader(true)
    }

    return (
        <header className="bg-ravn-black font-bold relative">
            <div className="flex h-full lg:hidden absolute top-0 left-6">
                <button className="text-white font-bold" hidden={data?.backHeader} onClick={handleBack}>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                </button>
            </div>
            <h2 className="text-white size-17 text-center p-4 lg:hidden">{data?.titlePage}</h2>
            <h2 className="hidden lg:block p-4 text-white">Ravn Star Wars Registry</h2>
        </header>
    )
}