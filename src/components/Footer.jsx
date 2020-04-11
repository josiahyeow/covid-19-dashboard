import React from 'react'
import styled from 'styled-components'

const GITHUB_URL = 'https://github.com/josiahyeow'
const LINKEDIN_URL = 'https://www.linkedin.com/in/josiah-yeow/'
const NOVELCOVID_URL = 'https://github.com/novelcovid/api'

const FooterContainer = styled.div`
  color: #ffffff;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 1rem;
`

const Profile = styled.div`
  margin-top: 1rem;
`

const Sources = styled.div`
  margin-top: 1rem;
`

const Link = styled.a`
  color: #ffffff;
  font-weight: bold;
`

const Footer = () => {
  return (
    <FooterContainer>
      <Sources>
        Data sourced from <Link href={NOVELCOVID_URL}>NovelCOVID API</Link>
      </Sources>
      <Profile>
        Josiah Yeow{' '}
        <Link href={GITHUB_URL}>
          <i className="fab fa-github" />{' '}
        </Link>
        <Link href={LINKEDIN_URL}>
          <i className="fab fa-linkedin" />
        </Link>
      </Profile>
    </FooterContainer>
  )
}

export default Footer
