import React, { useState } from 'react';

import Board from './board/Board';
import GameBoard from './conteners/GameBoard';

import './App.css';

const App: React.FC = () => {

    const [gameBoard, setGameBoard] = useState(new Board());

    return (
        <div className="App">
            <p>React App</p>
            <GameBoard gameBoard={gameBoard} />
        </div>
    );
}

export default App;
