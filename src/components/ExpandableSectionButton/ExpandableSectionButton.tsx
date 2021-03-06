import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@pizzafinance/ui-sdk'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`
const DownArrow = ()=>{
  return (
      <img src='/images/downarrow.png' alt='arrow' style={{margin:"0 20px"}}/>
    );
}

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  return (
    <Wrapper aria-label="Hide or show expandable content" role="button" onClick={() => onClick()}>
      <DownArrow/>
      <Text color="black" bold style={{fontFamily: "Por Siempre Gti"}} fontSize="20px">
        {expanded ? 'Hide' : 'Details'}
      </Text>
      <DownArrow/>
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
