// ** Icons Imports
import { Heart } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardBody, CardText } from 'reactstrap'

// ** Images
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'

const CardCongratulations = () => {
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<Heart size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>ยินดีต้อนรับ Phirachat 👋🏻,</h1>
          <CardText className='m-auto w-75'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sit amet erat ante.
          </CardText>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
