import { useState } from 'react';

import Player from './components/Player.jsx';
import GameBoard from './components/GameBoard.jsx';
import Log from './components/Log.jsx';
import GameOver from './components/GameOver.jsx';
import { WINNING_COMBINATIONS } from './components/winning-combinations.js';


const PLAYERS = {
  X: 'Player1',
  O: 'Player2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function derivedActivePlayer(gameTurns){
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O';
  }

  return currentPlayer;
}//helper function

function derivedGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])];
  //this make sures using spread operaator now that we added a brand new array when we derive a game board

  for (const turn of gameTurns){
      const { square, player } = turn;
      const {row, col } = square;

      gameBoard[row][col] = player; // we are overwriting some inner element in a nested array in another array with the symbol of a player that took a turn
  }
  return gameBoard;
}

function derivedWinner(gameBoard, players){

  let winner = null;

  for (const combination of WINNING_COMBINATIONS){
   const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
   const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
   const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]
  
 if (firstSquareSymbol &&
    firstSquareSymbol === secondSquareSymbol && 
    firstSquareSymbol === thirdSquareSymbol)
    {
       winner = players[firstSquareSymbol];
    }

 }

 return winner;
}

function App() {
  const [players, setPlayers]= useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  //const [activePlayer, setActivePlayer] = useState('X');
  const activePlayer = derivedActivePlayer(gameTurns);
  const gameBoard = derivedGameBoard(gameTurns)
  const winner = derivedWinner(gameBoard, players)
  const hasDraw = gameTurns.length === 9 && !winner;


function handleSelectSqaure(rowIndex, colIndex){
  //setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
  setGameTurns(prevTurns => {
   const currentPlayer = derivedActivePlayer(prevTurns)

    const updatedTurns = [{ square: { row: rowIndex, col: colIndex}, player: currentPlayer  }, ...prevTurns];

    return updatedTurns;
  });
}

function handleRestart(){
  setGameTurns([])
}

function handlePlayerNameChange(symbol, newName){
     setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      };
     });  
}

  return <main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
        <Player 
        initialName={PLAYERS.X}
        symbol="X" 
        isActive={activePlayer === 'X'}
        onChangeName={handlePlayerNameChange}
        />
        <Player 
        initialName={PLAYERS.O}
        symbol="O" 
        isActive={activePlayer === 'O'}
        onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && 
      (<GameOver winner={winner} onRestart={handleRestart}/>)}
      <GameBoard onSelectSquare={handleSelectSqaure} board={gameBoard} />
    </div>

    <Log turns={gameTurns} />
  </main>
}

export default App
