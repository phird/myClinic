import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect, Fragment } from "react"

// ** Store
import { getAllData } from "./store"

import Initial from "./Initial"
import Info from "./Info"
const page = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState()

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(getAllData()).then(response =>
                setData(response.payload)
            )
        };
        fetchData();
    }, [dispatch]);

    return (
        <Fragment>
            {!data ?
            <Initial/> :
             <Info/>}
        </Fragment>
    )
}

export default page