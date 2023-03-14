// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, data, details }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        <Button color='success' tag={Link} to={`/apps/invoice/print/${id}`} target='_blank' block  className='mb-75'>
          Print
        </Button>
        <Button tag={Link} to={`/apps/invoice/edit/${id}`} color='secondary' block outline className='mb-75'>
          Edit
        </Button>

      </CardBody>
    </Card>
  )
}

export default PreviewActions
