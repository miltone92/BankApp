import React, {useState, useEffect} from "react"

import "./Log.scss"

export const Log = () =>{

    const[log, setLog] = useState(JSON.parse(sessionStorage.getItem("log")));


    return(
        <div>
            {log !== null &&
                <div className="log__container">
                    <p className="log__info">{`Last sign in`}</p>
                    <p className="log__info">{`OS: ${log.os}`}</p>
                    <p className="log__info">{`OS Version: ${log.osVersion}`}</p>
                    <p className="log__info">{`Browser: ${log.browser}`}</p>
                    <p className="log__info">{`Browser Version: ${log.browserVersion}`}</p>
                    <p className="log__info">{`Date: ${log.date}`}</p>
                </div>
            }
        </div>
    )
}

export default Log;