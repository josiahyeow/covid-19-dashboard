import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  margin: 0 auto;
`
const Switch = styled.label`
  display: flex;
  height: 36px;
  position: relative;
  width: 70px;

  & input {
    display: none;
  }
`
const Input = styled.input`
  &:checked + .slider {
    background-color: ${({ theme }) => theme.color.background.darkest};
  }

  &:checked + .slider:before {
    transform: translateX(34px);
    border-color: ${({ theme }) => theme.color.background.darkest};
    background-color: ${({ theme }) => theme.color.text.lightest};
  }
`

const Slider = styled.div`
  background-color: ${({ theme }) => theme.color.background.darkest};
  border: 3px solid ${({ theme }) => theme.color.text.lightest};
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;

  &:before {
    background-color: ${({ theme }) => theme.color.text.lightest};
    border: 1px solid ${({ theme }) => theme.color.background.darkest};
    top: 1px;
    content: '';
    height: 26px;
    left: 1px;
    position: absolute;
    transition: 0.4s;
    width: 26px;
    z-index: 421;
  }

  &.round {
    border-radius: 34px;
  }

  &.round:before {
    border-radius: 50%;
  }
`

const ThemeSwitch = ({ mode, setMode }) => {
  return (
    <Container>
      <Switch
        className="switch"
        htmlFor="checkbox"
        title={`Change color scheme to ${mode ? 'dark' : 'light'}`}
      >
        <Input type="checkbox" id="checkbox" onChange={() => setMode(!mode)} />
        <Slider className="slider round"></Slider>
      </Switch>
    </Container>
  )
}

export default ThemeSwitch
