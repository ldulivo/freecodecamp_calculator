function App() {
  return (
    <div className="App">

      <section>
        <header>
          <input type="number" className="display" id="display" />

          <div className="ac">
            <button id="clear">AC</button>
            <button id="divide">/</button>
            <button id="multiply">*</button>
          </div>
        </header>

        <main>
          <div className="numbers">
            <div>
              <button id="seven">7</button>
              <button id="eight">8</button>
              <button id="nine">9</button>
              <button id="four">4</button>
              <button id="five">5</button>
              <button id="six">6</button>
              <button id="one">1</button>
              <button id="two">2</button>
              <button id="three">3</button>
            </div>
            <div>
              <button id="zero">0</button>
              <button id="decimal">.</button>
            </div>
          </div>

          <div className="op">
            <button id="subtract">-</button>
            <button id="add">+</button>
            <button id="equals">=</button>
          </div>
        </main>
      </section>


    </div>
  );
}

export default App;
