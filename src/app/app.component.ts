import { Component, OnInit } from '@angular/core';
import { Transformer, TransformerType } from './domain/transformer';

interface BattleResult {
  battles?: number;
  winner?: string;
  winners?: string[];
  survivors?: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  TransformerType = TransformerType;
  battles: number = 0;
  results: BattleResult = {};
  logger: string[] = [];

  autobots: Transformer[] = [
    new Transformer(
      'BUMBLEBEE',
      TransformerType.Autobot,
      2,
      8,
      4,
      7,
      7,
      10,
      1,
      7
    ),
    new Transformer(
      'RATCHET',
      TransformerType.Autobot,
      4,
      8,
      4,
      5,
      7,
      8,
      3,
      10
    ),
    new Transformer('JAZZ', TransformerType.Autobot, 5, 9, 7, 7, 8, 9, 5, 10),
    new Transformer('BLASTER', TransformerType.Autobot, 8, 8, 2, 8, 7, 9, 7, 9),
    new Transformer(
      'FIREFLIGHT',
      TransformerType.Autobot,
      7,
      5,
      8,
      8,
      6,
      9,
      7,
      3
    ),
    new Transformer(
      'OPTIMUS PRIME',
      TransformerType.Autobot,
      10,
      10,
      8,
      10,
      10,
      10,
      8,
      10
    )
  ];
  decepticons: Transformer[] = [
    new Transformer(
      'MEGATRON',
      TransformerType.Desepticons,
      10,
      10,
      4,
      8,
      10,
      9,
      10,
      9
    ),
    new Transformer(
      'RAMJET',
      TransformerType.Desepticons,
      8,
      5,
      9,
      9,
      5,
      8,
      7,
      6
    ),
    new Transformer(
      'RAZORCLAW',
      TransformerType.Desepticons,
      8,
      9,
      4,
      9,
      8,
      10,
      7,
      7
    ),
    new Transformer(
      'SHOCKWAVE',
      TransformerType.Desepticons,
      9,
      10,
      7,
      7,
      9,
      9,
      9,
      9
    ),
    new Transformer(
      'THUNDERCRACKER',
      TransformerType.Desepticons,
      7,
      7,
      9,
      7,
      5,
      8,
      7,
      7
    ),
    new Transformer(
      'MINDWIPE',
      TransformerType.Desepticons,
      8,
      6,
      7,
      5,
      7,
      8,
      7,
      9
    )
  ];


  teamAutobot = [...this.autobots];
  teamDecepticons = [...this.decepticons];

  ngOnInit(): void {}

  courageSuperiority(
    a: Transformer,
    b: Transformer
  ): { whoIsSuperior: TransformerType; difference: number } {
    let difference = Math.abs(a.courage - b.courage);
    if (a.courage > b.courage) {
      return { whoIsSuperior: a.type, difference };
    } else {
      return { whoIsSuperior: b.type, difference };
    }
  }

  strengthSuperiority(
    a: Transformer,
    b: Transformer
  ): { whoIsSuperior: TransformerType; difference: number } {
    let difference = Math.abs(a.strength - b.strength);
    if (a.strength > b.strength) {
      return { whoIsSuperior: a.type, difference };
    } else {
      return { whoIsSuperior: b.type, difference };
    }
  }

  skillSuperiority(
    a: Transformer,
    b: Transformer
  ): { whoIsSuperior: TransformerType; difference: number } {
    let difference = Math.abs(a.skill - b.skill);
    if (a.skill > b.skill) {
      return { whoIsSuperior: a.type, difference };
    } else {
      return { whoIsSuperior: b.type, difference };
    }
  }

  removeLooser(looser: Transformer): void {
    const team: string = looser.type;

    if (team === TransformerType.Autobot) {
      const index = this.teamAutobot.findIndex((x) => x.name === looser.name);
      this.teamAutobot.splice(index, 1);
    }

    if (team === TransformerType.Desepticons) {
      const index = this.teamDecepticons.findIndex(
        (x) => x.name === looser.name
      );
      this.teamDecepticons.splice(index, 1);
    }
  }

  fight(): void {
    const encounters =
      this.autobots.length < this.decepticons.length
        ? this.autobots.length
        : this.decepticons.length;
    this.autobots.sort((a, b) => a.rank - b.rank);
    this.decepticons.sort((a, b) => a.rank - b.rank);

    this.teamAutobot = [...this.autobots];
    this.teamDecepticons = [...this.decepticons];

    for (let i = 0; i < encounters; i++) {

      let courageous = this.courageSuperiority(
        this.autobots[i],
        this.decepticons[i]
      );
      let strongly = this.strengthSuperiority(
        this.autobots[i],
        this.decepticons[i]
      );
      let skilled = this.skillSuperiority(
        this.autobots[i],
        this.decepticons[i]
      );

      /*
        In the event, either of the above face each other, or a duplicate of each other, the game
        immediately ends with all competitors destroyed
      */

      if (this.autobots[i].name.toLowerCase() === 'optimus prime' && this.decepticons[i].name.toLowerCase() === 'predaking') {

      }

      /*
        Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
        any other criteria
      */

      if (this.autobots[i].name.toLowerCase() === 'optimus prime') {
        this.removeLooser(this.decepticons[i]);
        this.logger.push(`It is ${this.autobots[i].name}, automatically wins, no matter what.`)
        this.battles++;
        continue;
      }

      if (this.decepticons[i].name.toLowerCase() === 'predaking') {
        this.removeLooser(this.autobots[i]);
        this.logger.push(`It is ${this.decepticons[i].name}, automatically wins, no matter what.`)
        this.battles++;
        continue;
      }


      /*
        If any fighter is down 4 or more points of courage and 3 or more points of strength
        compared to their opponent, the opponent automatically wins the face-off regardless of
        overall rating (opponent has run away).
      */
      if (courageous.difference >= 4) {
        if (courageous.whoIsSuperior === TransformerType.Autobot) {
          this.removeLooser(this.decepticons[i]);
          this.logger.push(
            `${this.decepticons[i].name} loose to ${this.autobots[i].name}, reason: courage, ${this.decepticons[i].courage} vs ${this.autobots[i].courage}`
          );
        }
        if (courageous.whoIsSuperior === TransformerType.Desepticons) {
          this.removeLooser(this.autobots[i]);
          this.logger.push(
            `${this.autobots[i].name} loose to ${this.decepticons[i].name}, reason: courage, ${this.autobots[i].courage} vs ${this.decepticons[i].courage}`
          );
        }
        this.battles++;
        continue;
      }

      if (strongly.difference >= 3) {
        if (strongly.whoIsSuperior === TransformerType.Autobot) {
          this.removeLooser(this.decepticons[i]);
          this.logger.push(
            `${this.decepticons[i].name} loose to ${this.autobots[i].name}, reason: strength, ${this.decepticons[i].strength} vs ${this.autobots[i].strength}`
          );
        }
        if (strongly.whoIsSuperior === TransformerType.Desepticons) {
          this.removeLooser(this.autobots[i]);
          this.logger.push(
            `${this.autobots[i].name} loose to ${this.decepticons[i].name}, reason: strength, ${this.autobots[i].strength} vs ${this.decepticons[i].strength}`
          );
        }
        this.battles++;
        continue;
      }

      /*
        Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win
        the fight regardless of the overall rating.
      */

      if (skilled.difference >= 3) {
        if (skilled.whoIsSuperior === TransformerType.Autobot) {
          this.removeLooser(this.decepticons[i]);
          this.logger.push(
            `${this.decepticons[i].name} loose to ${this.autobots[i].name}, reason: skill, ${this.decepticons[i].skill} vs ${this.autobots[i].skill}`
          );
        }
        if (skilled.whoIsSuperior === TransformerType.Desepticons) {
          this.removeLooser(this.autobots[i]);
          this.logger.push(
            `${this.autobots[i].name} loose to ${this.decepticons[i].name}, reason: skill, ${this.autobots[i].skill} vs ${this.decepticons[i].skill}`
          );
        }
        this.battles++;
        continue;
      }

      /*
        In the event of a tie, both Transformers are considered destroyed
      */
      if (
        this.autobots[i].getOverallRating() ===
        this.decepticons[i].getOverallRating()
      ) {
        this.removeLooser(this.autobots[i]);
        this.removeLooser(this.decepticons[i]);
        this.logger.push(
          `Both ${this.autobots[i].name} and ${
            this.decepticons[i].name
          } loose, reason: tie, ${this.autobots[
            i
          ].getOverallRating()} vs ${this.decepticons[i].getOverallRating()}`
        );
        this.battles++;
        continue;
      }

      /*
        The winner is the Transformer with the highest overall rating.
      */

      if (
        this.autobots[i].getOverallRating() >
        this.decepticons[i].getOverallRating()
      ) {
        this.removeLooser(this.decepticons[i]);
        this.logger.push(
          `${this.decepticons[i].name} loose to ${
            this.autobots[i].name
          }, reason: overall rating, ${this.decepticons[
            i
          ].getOverallRating()} vs ${this.autobots[i].getOverallRating()}`
        );
      } else {
        this.removeLooser(this.autobots[i]);
        this.logger.push(
          `${this.autobots[i].name} loose to ${
            this.decepticons[i].name
          }, reason: overall rating, ${this.autobots[
            i
          ].getOverallRating()} vs ${this.decepticons[i].getOverallRating()}`
        );
      }

      this.battles++;
    }
    this.autobots = this.teamAutobot;
    this.decepticons = this.teamDecepticons;

    /*
      The team who eliminated the largest number of the opposing team is the winner
    */
    this.results = {
      battles: this.battles,
      winner: this.teamAutobot.length > this.teamDecepticons.length
      ? TransformerType.Autobot
      : TransformerType.Desepticons,
      winners: this.teamAutobot.length > this.teamDecepticons.length ? this.autobots.map(x => x.name): this.decepticons.map(x => x.name),
      survivors: this.teamAutobot.length < this.teamDecepticons.length ? this.autobots.map(x => x.name): this.decepticons.map(x => x.name),
    };
  }
}
