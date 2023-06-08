import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSpinner} from '@fortawesome/free-solid-svg-icons'

config.autoAddCss = false;

export default function LoadingIndicator () {
    return (
        <div className="flex items-center justify-center font-bold p-4">
            <FontAwesomeIcon icon={faSpinner} size="lg" spin className='color-ranv-text-light' />
            <h6 style={{marginLeft: "8px"}} className='color-ranv-text-light'>Loading</h6>
        </div>
    )
}