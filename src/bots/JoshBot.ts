import { Gamestate, BotSelection } from '../models/gamestate';

class Bot {
    moves: BotSelection[] = ['R', 'P', 'S', 'W', 'D'];
    dynamiteCount = [0, 0];
    opponentMovesHistory: BotSelection[] = [];
    opponentMovesFrequency = new Map([
        ['R', 0],
        ['P', 0],
        ['S', 0],
        ['W', 0],
        ['D', 0]
    ]);

    makeMove(gamestate: Gamestate): BotSelection {
        this.removeMoveFromArray('W')

        const lastRound = gamestate.rounds[gamestate.rounds.length - 1];
        if (gamestate.rounds.length > 0) {
            this.opponentMovesHistory.push(lastRound.p2);
            this.increaseOpponentMoveFrequency(lastRound.p2)
            if(lastRound.p2 === 'D'){
                this.dynamiteCount[1]++;
                if (this.dynamiteCount[1] >= 100) {
                    this.removeMoveFromArray('W')
                }
            }
        }

        const pattern = this.detectPattern(gamestate);

        return this.randomiseMove()
    }

    detectPattern(gamestate: Gamestate) {
        // console.log(this.opponentMovesFrequency)
    }

    getWinningMove(move: BotSelection): BotSelection {
        switch (move) {
            case 'R':
                return 'P';
            case 'P':
                return 'S';
            case 'S':
                return 'R';
            default:
                return 'R';
        }
    }

    randomiseMove(): BotSelection {
        const randomNumber = Math.floor(Math.random() * this.moves.length);
        let move = this.moves[randomNumber];
        if(move === 'D') {
            this.dynamiteCount[0]++;
            if (this.dynamiteCount[0] >= 100) {
                this.removeMoveFromArray('D');
            }
        }
        return move;
    }

    removeMoveFromArray(move: BotSelection) {
        const index = this.moves.indexOf(move);
        if (index !== -1) {
            this.moves.splice(index, 1);
        }
    }

    increaseOpponentMoveFrequency(move) {
        const frequency = this.opponentMovesFrequency.get(move) || 0;
        this.opponentMovesFrequency.set(move, frequency + 1);
    }

    countOccurrences(arr, item): Number {
        const filteredArray = arr.filter((element) => element === item);
        return filteredArray.length;
    }
}

export = new Bot();