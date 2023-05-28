import Input from './components/Input'
import Button from './components/Button'

import { Container, Content, Row } from "./styles";
import { useState, useRef } from 'react';

const App = () => {
  const totalNumber = useRef('0');
  const firstNumber = useRef('0');
  const operation = useRef('');
  const isNumberInput = useRef(false);
  const [currentNumber, setCurrentNumber] = useState('0');

  const handleOnClear = () => {
    setCurrentNumber('0');
    isNumberInput.current = false;
    totalNumber.current = '0';
    firstNumber.current = '0';
    operation.current = '';
  }
  const handleOnBack = () => {
    setCurrentNumber('0');
    isNumberInput.current = false;
  }
  const handlePercent = () => {
    const percent = Number(currentNumber) / 100
    setCurrentNumber(String(percent))
  }
  const handleAddNumber = (number) => {
    if (isNumberInput.current){
      setCurrentNumber(prev => `${prev}${number}`)
    } else {
      setCurrentNumber(`${number}`);
    }
    isNumberInput.current = true;
  }
  const handleAddDot = () => {
    if (isNumberInput.current && !currentNumber.includes('.')) {
      setCurrentNumber(prev => `${prev}.`)
    } else {
      setCurrentNumber('0.')
    }
    isNumberInput.current = true;
  }
  const handleAddMinus = () => {
    if (isNumberInput.current && !currentNumber.includes('-')) {
      setCurrentNumber(prev => `-${prev}`)
    } else {
      setCurrentNumber(currentNumber.replace('-', ''))
    }
    isNumberInput.current = true;
  }
  const handleOperations = (op) => {
    operation.current = op;
    if (isNumberInput.current){
      firstNumber.current = currentNumber;
      handleEquals();
    }
  }
  const sumOperation = () => {
    const sum = Number(totalNumber.current) + Number(firstNumber.current);
    totalNumber.current = String(sum);
    setCurrentNumber(String(sum));
    isNumberInput.current = false;
  }
  const subOperation = () => {
    const sub = Number(firstNumber.current) - Number(totalNumber.current);
    totalNumber.current = String(sub);
    setCurrentNumber(String(sub));
    isNumberInput.current = false;
  }
  const multOperation = () => {
    if (totalNumber.current === '0'){
      totalNumber.current = currentNumber;
      isNumberInput.current = false;
    } else {
      const mult = Number(totalNumber.current) * Number(firstNumber.current);
      totalNumber.current = String(mult);
      setCurrentNumber(String(mult));
      isNumberInput.current = false;
    }
  }
  const divOperation = () => {
    if (totalNumber.current === '0'){
      totalNumber.current = currentNumber;
      isNumberInput.current = false;
    } else {
      const div = Number(totalNumber.current) / Number(firstNumber.current);
      totalNumber.current = String(div);
      setCurrentNumber(String(div));
      isNumberInput.current = false;
    }
  }
  const handleEquals = () => {
    if (isNumberInput.current){
      firstNumber.current = currentNumber;
    }
    if (firstNumber.current !== '0' && currentNumber !== '0') {
      switch (operation.current) {
        case '+':
          sumOperation();
          break;
        case '-':
          subOperation();
          break;
        case 'x':
          multOperation();
          break;
        case '÷':
          divOperation();
          break;
        default:
          break;
      }
    }
  }

  return (
    <Container className="App">
      <Content>
        <Input value={currentNumber}/>
        <Row>
          <Button label="%" onClick={handlePercent}/>
          <Button label="AC" onClick={handleOnClear} />
          <Button label="<<" onClick={handleOnBack}/>
          <Button label="÷" onClick={() => handleOperations('÷')}/>
        </Row>
        <Row>
          <Button label="7" onClick={() => handleAddNumber('7')}/>
          <Button label="8" onClick={() => handleAddNumber('8')} />
          <Button label="9" onClick={() => handleAddNumber('9')} />
          <Button label="x" onClick={() => handleOperations('x')}/>
        </Row>
        <Row>
          <Button label="4" onClick={() => handleAddNumber('4')} />
          <Button label="5" onClick={() => handleAddNumber('5')} />
          <Button label="6" onClick={() => handleAddNumber('6')} />
          <Button label="-" onClick={() => handleOperations('-')}/>
        </Row>
        <Row>
          <Button label="1" onClick={() => handleAddNumber('1')} />
          <Button label="2" onClick={() => handleAddNumber('2')} />
          <Button label="3" onClick={() => handleAddNumber('3')} />
          <Button label="+" onClick={() => handleOperations('+')}/>
        </Row>
        <Row>
          <Button label="+/-" onClick={handleAddMinus}/>
          <Button label="0" onClick={() => handleAddNumber('0')} />
          <Button label="." onClick={handleAddDot}/>
          <Button label="=" onClick={handleEquals}/>
        </Row>
      </Content>
    </Container>
  );
}

export default App;
