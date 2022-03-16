import { useState } from 'react';

function App() {
  const [inputDisplay, setInputDisplay]         = useState('0');
  const [auxDisplayOne, setAuxDisplayOne]     = useState('');
  const [auxDisplayTwo, setAuxDisplayTwo]     = useState('');
  const [currentOperation, setCurrentOperation] = useState(false);
  const [currentOperationNegative, setCurrentOperationNegative] = useState(false);
  const [tempOperation, setTempOperation] = useState(false);
  const [isDecimal, setIsDecimal] = useState(false)

  // get the button value
  const keyValue = (event) => {
    const value = event.target.innerText;
    const isNumber = /[0-9]/;
    if ( value.match(isNumber) ) return(addValue(value));
    
    return (
      mathOperation(value)
    );
  }

  // insert the value in the display input
  const addValue = (value) => {
    if (currentOperationNegative === true) setCurrentOperationNegative(false);

    if ( value === '0' && inputDisplay === '0') return;
    
    if ( inputDisplay === '0' || tempOperation ) {
      setInputDisplay(value);
      setTempOperation(false);
    } else {
      setInputDisplay(inputDisplay + value);
    }

    if ( !currentOperation ) {
      setAuxDisplayOne(auxDisplayOne + value);
      return;
    } else {
      setAuxDisplayTwo(auxDisplayTwo + value);
      return;
    }
  }

  // Clear display
  const clear = () => {
    setInputDisplay('0');
    setAuxDisplayOne('')
    setAuxDisplayTwo('')
    setCurrentOperation(false)
    setTempOperation(false);
    setIsDecimal(false);
    setCurrentOperationNegative(false);
  }

  // Math operations
  const mathOperation = (op) => {
    switch (op) {
      case '=':
        equals();
        break;

      case '+':
        setCurrentOperation('+');
        setTempOperation(true);
        setIsDecimal(false);
        break;

      case '-':
        (currentOperationNegative === true) ? setCurrentOperationNegative('-') : setCurrentOperation('-');
        setTempOperation(true);
        setIsDecimal(false);
        break;

      case '*':
        setCurrentOperation('*');
        setTempOperation(true);
        setCurrentOperationNegative(true);
        setIsDecimal(false);
        break;

      case '/':
        setCurrentOperation('/');
        setTempOperation(true);
        setCurrentOperationNegative(true);
        setIsDecimal(false);
        break;
    
      default:  // if value is dot (decimal)
        if ( !isDecimal ){
          
          setIsDecimal(true);

          ( inputDisplay === '0' || tempOperation ) ? setInputDisplay('0.') : setInputDisplay(inputDisplay + '.');

          if ( !currentOperation ) {
            ( auxDisplayOne === '' ) ? setAuxDisplayOne('0.') : setAuxDisplayOne(auxDisplayOne + '.');
          } else {
            ( auxDisplayTwo === '' ) ? setAuxDisplayTwo('0.') : setAuxDisplayTwo(auxDisplayTwo + '.');
          }

        }

        return;
    }
        
    if (auxDisplayTwo !== '') {
      equals();
    }
    return;
  }

  const equals = () => {
    
    setAuxDisplayTwo('');
    
    switch (currentOperation) {
      case '+':
        setInputDisplay( parseFloat(auxDisplayOne) + parseFloat(auxDisplayTwo) );
        setAuxDisplayOne( parseFloat(auxDisplayOne) + parseFloat(auxDisplayTwo) );
        return;

      case '-':
        setInputDisplay( parseFloat(auxDisplayOne) - parseFloat(auxDisplayTwo) );
        setAuxDisplayOne( parseFloat(auxDisplayOne) - parseFloat(auxDisplayTwo) );
        return;

      case '*':
        if (currentOperationNegative === '-') {
          setInputDisplay( ( parseFloat(auxDisplayOne) * parseFloat(auxDisplayTwo) ) * (-1) );
          setAuxDisplayOne( ( parseFloat(auxDisplayOne) * parseFloat(auxDisplayTwo) ) * (-1) );
        } else {
          setInputDisplay( parseFloat(auxDisplayOne) * parseFloat(auxDisplayTwo) );
          setAuxDisplayOne( parseFloat(auxDisplayOne) * parseFloat(auxDisplayTwo) );
        }
        return;

      case '/':
        if (currentOperationNegative === '-') {
          setInputDisplay( ( parseFloat(auxDisplayOne) / parseFloat(auxDisplayTwo) ) * (-1) );
          setAuxDisplayOne( ( parseFloat(auxDisplayOne) / parseFloat(auxDisplayTwo) ) * (-1) );
        } else {
          setInputDisplay( parseFloat(auxDisplayOne) / parseFloat(auxDisplayTwo) );
          setAuxDisplayOne( parseFloat(auxDisplayOne) / parseFloat(auxDisplayTwo) );
        }
        return;
    
      default:
        break;
    }
  }

  return (
    <div className="App">

      <section>
        <header>
          <input 
            type="number" 
            className="display" 
            id="display" value={ inputDisplay } 
            disabled
          />

          <div className="ac">
            <button id="clear" onClick={ () => clear() }>AC</button>
            <button onClick={ keyValue } id="divide">/</button>
            <button onClick={ keyValue } id="multiply">*</button>
          </div>
        </header>

        <main>
          <div className="numbers">
            <div>
              <button onClick={ keyValue } id="seven">7</button>
              <button onClick={ keyValue } id="eight">8</button>
              <button onClick={ keyValue } id="nine">9</button>
              <button onClick={ keyValue } id="four">4</button>
              <button onClick={ keyValue } id="five">5</button>
              <button onClick={ keyValue } id="six">6</button>
              <button onClick={ keyValue } id="one">1</button>
              <button onClick={ keyValue } id="two">2</button>
              <button onClick={ keyValue } id="three">3</button>
            </div>
            <div>
              <button onClick={ keyValue } id="zero">0</button>
              <button onClick={ keyValue } id="decimal">.</button>
            </div>
          </div>

          <div className="op">
            <button onClick={ keyValue } id="subtract">-</button>
            <button onClick={ keyValue } id="add">+</button>
            <button onClick={ keyValue } id="equals">=</button>
          </div>
        </main>
      </section>


    </div>
  );
}

export default App;
