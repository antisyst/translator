// components/Translator.tsx

import React, { useState } from 'react';
import './App.scss';
import { styled } from 'styled-components';

const Showcase = styled.main `
  text-align: center;
  margin-top: 20vh;
  color: #ffff;
  @media only screen and (max-width: 768px) {
    margin-top: 5vh;
  }
`
const Container = styled.div `
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media only screen and (max-width: 768px) {
  flex-direction: column;
  }
`
const TextArea = styled.textarea `
resize: none;
outline: none;
width: 500px;
font-size: 17px;
color: #ffff;
font-weight: bold;
background: none;
border-radius: 8px;
transition: all 0.4s ease-out;
border: 2px solid #131313;
padding: 20px;
height: 200px;

&:focus {
 border: 2px solid #ffff;

 &::placeholder {
  opacity: 0;
  transition: all 0.4s ease-out;
 }
}
@media only screen and (max-width: 768px)  {
  width: 350px;
}
`
const SelectItem = styled.select `
padding: 10px 18px;
    outline: none;
    border: 2px solid #ffff;
    font-size: 17px;
    color: #ffff;
    background: #000;
    transition: all 0.4s ease-out;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    border-radius: 0;
`
const OptionItem = styled.option `
border-radius: 1px;
color: #ffff;
transition: all 0.4s ease-out;
font-weight: bold;
background: #000;
border: 1px solid #ffff;
`
const UtilsTools = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5px 30px;
  justify-content: center;
`
const FirstContent = styled.h1 `
  color: #ffff;
  font-size: 24px;
  margin-bottom: 1vh;
`
const TranslateAction = styled.div `
width: 500px;
font-size: 17px;
color: #ffff;
font-weight: bold;
background: none;
border-radius: 8px;
transition: all 0.4s ease-out;
border: 2px solid #131313;
padding: 20px;
height: 200px;
@media only screen and (max-width: 768px)  {
  width: 350px;
}
`
const ActionButton = styled.button `
  padding: 12px 26px;
  cursor: pointer;
  background: none;
  margin-bottom: 1.1vh;
  margin-top: 1.1vh;
  color: #ffff;
  border-radius: 15px;
  font-weight: bold;
  font-family: 'Poppins', sans-serif;
  border: 3px solid #ffff;
`
const CreatorContent = styled.h3 `
  color: #ffff;
  font-weight: bold;
  text-align: center;

  a {
    color: #ffff;
  }
`
interface Props {}

const Translator: React.FC<Props> = () => {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('es');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  };

  const handleTranslate = async () => {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
      text
    )}&langpair=en|${language}`;

    const response = await fetch(url);
    const data = await response.json();
    setTranslatedText(data.responseData.translatedText);
  };

  return (
    <Showcase>
      <FirstContent>Language Translator</FirstContent>
      <CreatorContent>Developed by <a href="https://rmzn.netlify.app" target='_blank'>Ramazan Azimli</a></CreatorContent>
    <Container>
      <div>
      <TextArea value={text} onChange={handleTextChange} placeholder='Text Here ... (EN)' />
      </div>
      <UtilsTools>
      <ActionButton onClick={handleTranslate}>Translate</ActionButton>
      <SelectItem className='custom-select' value={language} onChange={handleLanguageChange}>
        <OptionItem value="es">Spanish</OptionItem>
        <OptionItem value="fr">French</OptionItem>
        <OptionItem value="de">German</OptionItem>
        <OptionItem value="it">Italian</OptionItem>
        <OptionItem value="tr">Turkish</OptionItem>
        <OptionItem value="az">Azerbaijani</OptionItem>
      </SelectItem>
      </UtilsTools>
      <div>
       <TranslateAction><p className='animate__animated animate__fadeIn'>
       {translatedText}</p></TranslateAction>
      </div>
    </Container>
    </Showcase>
  );
};

export default Translator;


