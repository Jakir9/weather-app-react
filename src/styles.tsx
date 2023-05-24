import styled from 'styled-components'

const Title = styled.h1`
  font-family: 'Montserrat', Arial;
  color: #fff;
  font-size: 3.5rem;
  text-align: center;
  background-color: #333;
  max-width: 50%;
  margin: 1rem auto;
  padding: 0.4rem;
  border-radius: 1%;
`

const MainContainer = styled.div`
  background-image: url('https://source.unsplash.com/random/?cities');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 80%;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 4%;
  border: 1px solid #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const WeatherWrapper = styled.p`
  font-family: 'Montserrat', Arial;
  color: #333;
  font-size: 1rem;
  text-align: center;
  background-color: #fff;
  max-width: 40%;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 5%;
  border: 1px solid #333;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

export { Title, MainContainer, WeatherWrapper }
