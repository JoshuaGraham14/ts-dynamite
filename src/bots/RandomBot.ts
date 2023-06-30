import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    moves: BotSelection[] = ['R', 'P', 'S', 'W', 'D'];
    dynamiteCount = 0
    possibleMoves = 5
    makeMove(gamestate: Gamestate): BotSelection {
        const randomNumber = Math.floor(Math.random() * 5);
        let move = this.moves[randomNumber]
        return this.randomiseMove()
    }

    randomiseMove(): BotSelection {
        const randomNumber = Math.floor(Math.random() * this.possibleMoves);
        let move = this.moves[randomNumber];
        if(move === 'D') {
            this.dynamiteCount++;
            if (this.dynamiteCount >= 100) {
                this.possibleMoves = 4;
            }
        }
        return move;
    }
}

export = new Bot();