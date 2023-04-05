// ** React Imports
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardBody, Button } from 'reactstrap'

const PreviewActions = ({ id, data, details }) => {
  return (
    <Card className='invoice-action-wrapper'>
      <CardBody>
        <Button color='success' tag={Link} to={`/apps/invoice/print/${id}`} target='_blank' block  className='mb-75'>
          ปริ้น
        </Button>
      </CardBody>
    </Card>
  )
}

export default PreviewActions
