import styled from 'styled-components'

interface StyledTitleProps {
  isFinished?: boolean
}

const CardTitle = styled.div<StyledTitleProps>`
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled' : 'primary']};
  font-weight: 600;
  font-size: 24px;
  line-height: 1.1;
  margin-bottom: 14px;
  color:: #4c84c1;
`

export default CardTitle
