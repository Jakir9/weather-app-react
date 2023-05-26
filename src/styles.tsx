import styled from 'styled-components'

const Title = styled.h2`
  font-family: 'Montserrat', Arial;
  font-style: italic;
  color: #fff;
  font-size: 2.5rem;
  text-align: center;
  max-width: 50%;
  border-radius: 1%;
`

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
`

const WeatherWrapper = styled.div`
  font-family: 'Montserrat', Arial;
  font-size: 1rem;
  text-align: center;
  background-color: #8b78e6;
  color: #fff;
  max-width: 100%;
  width: 20%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
`

export { Title, MainContainer, WeatherWrapper }
