import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { ButtonMenu, ButtonMenuItem, Heading } from '@pizzafinance/ui-sdk'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import PastLotteryDataContext from 'contexts/PastLotteryDataContext'
import { getLotteryIssueIndex } from 'utils/lotteryUtils'
import Page from 'components/layout/Page'
import FlexLayout from 'components/layout/Flex'
import useI18n from '../../hooks/useI18n'
import { useLottery } from '../../hooks/useContract'
import Hero from './components/Hero'
import Divider from './components/Divider'
import NextDrawPage from './NextDrawPage'
import PastDrawsPage from './PastDrawsPage'
import {lotteryHistory} from '../../api/lottery/lotteryHistory'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
`

const Lottery: React.FC = () => {
  const lotteryContract = useLottery()
  const { account } = useWallet()
  const TranslateString = useI18n()
  const [activeIndex, setActiveIndex] = useState(0)
  const [historyData, setHistoryData] = useState([])
  const [historyError, setHistoryError] = useState(false)
  const [currentLotteryNumber, setCurrentLotteryNumber] = useState(0)
  const [mostRecentLotteryNumber, setMostRecentLotteryNumber] = useState(1)

  // useEffect(() => {
  //   fetch(`https://api.pizzafinance.app/api/lotteryHistory`)
  //     .then((response) => response.json())
  //     .then((data) => setHistoryData(data))
  //     .catch(() => {
  //       setHistoryError(true)
  //     })
  // }, [])
  useEffect(() => {
    lotteryHistory()
    .then((data) =>{
      setHistoryData(data)
      setHistoryError(false)
    }
  )
},[])

  useEffect(() => {
    const getInitialLotteryIndex = async () => {
      const index = await getLotteryIssueIndex(lotteryContract)
      const previousLotteryNumber = index - 1

      setCurrentLotteryNumber(index)
      setMostRecentLotteryNumber(previousLotteryNumber)
    }

    if (account && lotteryContract) {
      getInitialLotteryIndex()
    }
  }, [account, lotteryContract])

  const handleClick = (index) => {
    setActiveIndex(index)
  }

  return (
    <>
      <Page style={{backgroundImage:"url(/images/mainback_lottery.jpg)"}}>
        <Hero />
        <Wrapper>
          <ButtonMenu activeIndex={activeIndex} onClick={handleClick} size="sm" variant="primary">
            <ButtonMenuItem>{TranslateString(999, 'Next draw')}</ButtonMenuItem>
            <ButtonMenuItem>{TranslateString(999, 'Past draws')}</ButtonMenuItem>
          </ButtonMenu>
        </Wrapper>
        <Divider />
        <PastLotteryDataContext.Provider
          value={{ historyError, historyData, mostRecentLotteryNumber, currentLotteryNumber }}
        >
          {activeIndex === 0 ? <NextDrawPage /> : <PastDrawsPage />}
        </PastLotteryDataContext.Provider>
      </Page>
    </>
  )
  // return (
  //   <>
  //   <Page style={{background: "url(/images/mainback_lottery.jpg)",backgroundSize:"100% 100%",minHeight: "calc(100vh - 290px)"}}>
  //     <Heading as="h1" size="lg" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
  //       {TranslateString(999, '')}
  //     </Heading>
  //     <div>
  //       <FlexLayout>
  //           <Heading as="h1" size="lg" color="secondary" mb="50px" style={{ textAlign: 'center' }}>
  //             {TranslateString(999, 'Coming Soon')}
  //           </Heading>
  //       </FlexLayout>
  //     </div>
  //   </Page>
  //
  //   </>
  // )
}

export default Lottery
