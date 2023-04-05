import { Fragment, useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card,CardBody } from "reactstrap"

// * Table Columns 
import {column} from './column'
import { useDispatch, useSelector } from "react-redux"


// * Store & Action





// ** Third Party Component 





// ** Reactstrap Imports


// ** Style 

const CustomHeader = () => {

}



const DiseaseList = () => {

    const dispatch = useDispatch()
    const store = useSelector(state => state.disease)

    return (
        <Fragment>
            <Card>
                <CardBody></CardBody>
            </Card>
        </Fragment>
    )
}

export default DiseaseList