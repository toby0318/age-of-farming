import React from 'react'
import { Card } from '@pizzafinance/ui-sdk'
import { DataResponse } from 'utils/getLotteryRoundData'
import PastRoundCardError from './PastRoundCardError'
import PastRoundCardDetails from './PastRoundCardDetails'

interface PastRoundCardProps {
  error: {
    message: string
  }
  data: DataResponse
}

const PastRoundCard: React.FC<PastRoundCardProps> = ({ error, data }) => {
  return <Card style={{borderRadius:"0",backgroundImage:"url(/images/pastlottery_back.png)",backgroundSize: "100% 100%"}}>{error.message ? <PastRoundCardError error={error} /> : <PastRoundCardDetails data={data} />}</Card>
}

export default PastRoundCard
