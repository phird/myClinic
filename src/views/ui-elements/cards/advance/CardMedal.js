// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'

// ** Images
import welcome from '../../../../assets/images/illustration/welcome.svg'

const CardMedal = () => {
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Welcome" 🎉 Phirachat!</h5>
        <CardText className='font-small-3'>Here is a Insight page</CardText>
        <img className='congratulation-medal' src={welcome} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal
