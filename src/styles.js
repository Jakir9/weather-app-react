import Styled from 'styled-components'

const Title = Styled.h1`
    font-family: Montserrat, Arial;
    color: white;
    font-size: 3.5rem;
    text-align: center;
    background-color: black;
    max-width: 50%;
    margin: 1rem auto;
    padding: 0.4rem;
    border-radius: 1%;
`

const MainContainer = Styled.div`
    background-color:grey;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 80%;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 4%;
    border: 1px solid black;

`

const WeatherWrapper = Styled.p`
     font-family: Montserrat, Arial;
    color: black;
    font-size: 1rem;
    text-align: center;
    border: black;
    background-color: lightblue;
    max-width: 40%;
    margin: 1rem auto;
    padding: 1rem;
    border-radius: 5%;
    border: 1px solid black;
`

export { Title, MainContainer, WeatherWrapper }
