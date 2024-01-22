import React, { useState } from 'react';

// CSS
import './styles/poker.css';

function poker() {
    const [numPeople, setNumPeople] = useState('');
    const [counter, setCounter] = useState(0);
    const [result, setResult] = useState('');

    const handleCardDistribution = () => {
        if (!numPeople || isNaN(numPeople) || numPeople < 0) {
            setResult("Input value does not exist or value is invalid");
            return;
        }

        fetch('http://localhost:8000/backend.php?numPeople=' + numPeople)
            .then(response => response.json())
            .then((data) => {
                setCounter(counter => counter + 1);
                const cardsResult = data.cards.map((cards, index) => `Person_${index + 1} - ${cards}`).join('\n');
                setResult(`Result ${counter + 1}:\n${cardsResult}`);
            })
            .catch(error => console.error('Error:', error));
    };
    return (
        <div className="poker-container">
            <h1>Card Distribution</h1>
            <label>Number of People: </label>
            <input type="number" value={numPeople} onChange={(e) => setNumPeople(e.target.value)} />
            <button onClick={handleCardDistribution}>Distribute Cards</button>
            <div>
                <h2>Result:</h2>
                <pre>{result}</pre>
            </div>
        </div>
    );
}

export default poker;