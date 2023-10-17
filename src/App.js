import { useEffect, useState } from "react";

export default function Estatico1() {
    const numero1 = 1;
    const numero2 = 30;
    const time = 5;

    const [timer, setTimer] = useState(null);
    const [num, setNum] = useState(false);
    const [res, setRes] = useState(Math.floor(Math.random() * (numero2 - numero1 + 1)) + numero1);
    const [value, setValue] = useState(10)
    const [intervalo, setIntervalo] = useState(numero2)
    const [fim, setFim] = useState('')
    const [meuTimer, setMeuTimer] = useState(5)
    const [trapaca, setTrapaca] = useState(false)
    const [score, setScore] = useState(localStorage.getItem('score') || '0')

   

    useEffect(()=>{

      let _score = localStorage.getItem('score')
      let score = Number.parseInt(_score)
        setScore(score)
    },[])



    useEffect(()=>{
        localStorage.setItem('score', score)
    },[score])



    useEffect(() => {

        let timerId;

        if (timer > 0) {
            timerId = setTimeout(() => {
                setTimer(timer - 1);
            }, 1000);
        } else if (timer === 0) {
            setNum(true);
            resultado()
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [timer]);

    const startTimer = (meutimer) => {
        if (intervalo == value) {
            setTrapaca(true)
        } else {
            setTrapaca(false)
        }
        setFim('')
        setNum(false);
        setRes(Math.floor(Math.random() * (intervalo - numero1 + 1)) + numero1);
        setTimer(meutimer);
    };

    const resultado = () => {

        if (res == value && trapaca == false) {
            setFim(<h1 style={{ color: 'green' }}>Parabéns, Acertou!!</h1>)
            let _score = Number.parseInt(score)
            setScore(_score + 1)
        } else if (trapaca) {
          let _score = Number.parseInt(score)
          setScore(_score - 3)
        }
        else {
            setFim(<h1 style={{ color: 'red' }}>Errou, Tente outra vez!</h1>)
            if (score == 0) {
                return
            } else {
              let _score = Number.parseInt(score)
              setScore(_score - 1)
            }
        }
    }

    return (
        <div style={{
            display: "flex", justifyContent: 'center', alignItems: 'center', flexDirection: 'column',
            width: '500px', height: 'auto', padding: '20px', margin: 'auto', marginTop: "20vh", marginBottom: '5px',
            backgroundColor: '#ddd'
        }}>
            {/* Score */}
            <span style={{
                alignSelf: "end", marginBottom: '20px',
                backgroundColor: 'white', borderRadius: '3px', padding: '4px', color: 'purple', fontSize: '1.2rem',
                fontWeight: 'bolder'
            }}>Score: {score}</span>


            <h1 style={{
                fontSize: '2.3rem', textAlign: 'center', marginTop: '0px', marginBottom: '30px',
                backgroundColor: 'rebeccapurple', color: 'white', borderRadius: '4px', padding: '5px'
            }}>Tente adivinhar o número</h1>
            <span style={{ backgroundColor: '#77618d', borderRadius: 4, fontSize: '1.2rem', color: 'white', padding: '5px' }}>Escolha um número inserindo no campo abaixo</span><br />
            <input type="number"
                value={value}
                onChange={(e) => { setValue(Number(e.target.value)) }}

                style={{ height: '30px', textAlign: 'center' }}
                min={1}
            ></input><br />

            <span style={{ backgroundColor: '#77618d', borderRadius: 4, fontSize: '1.2rem', color: 'white', padding: '5px' }}>
                Escolha um intervalo para Sortear</span><br />
            <input type="number"
                value={intervalo}
                onChange={(e) => { setIntervalo(Number(e.target.value)) }}

                style={{ height: '30px', textAlign: 'center' }}
                min={1}
            ></input><br />
            <span style={{ backgroundColor: '#77618d', borderRadius: 4, fontSize: '1.2rem', color: 'white', padding: '5px' }}> Escolha o temporizador
            </span><br />
            <input type="number" value={meuTimer}
                onChange={(e) => setMeuTimer(Number(e.target.value))}
                style={{ width: '50px', textAlign: 'center' }}
                min={1}
                max={60}

            ></input>
            <span style={{ color: 'red' }}> Tempo... {timer}</span>
            {num ? <h1>Numero: {res}</h1> : <h2>Numero: ??</h2>}
            <div>
                <button style={{ padding: '10px', fontSize: '1.2rem' }} onClick={() => startTimer(meuTimer)}>Start</button>
            </div>
            <div>
                {trapaca ? <h1 style={{ color: 'black', backgroundColor: 'red' }}>Não Trapaceie!</h1> : fim}
            </div>
        </div>
    );
}