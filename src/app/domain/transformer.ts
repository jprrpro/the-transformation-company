export enum TransformerType {
  Autobot = 'A',
  Desepticons = 'D',
}



export class Specs {
  strength: number;
  intelligence: number;
  speed: number;
  endurance: number;
  rank: number;
  courage: number;
  firepower: number;
  skill: number;

  constructor(
    strength: number = 0,
    intelligence: number = 0,
    speed: number = 0,
    endurance: number = 0,
    rank: number = 0,
    courage: number = 0,
    firepower: number = 0,
    skill: number = 0
  ) {
    this.strength = strength;
    this.intelligence = intelligence;
    this.speed = speed;
    this.endurance = endurance;
    this.rank = rank;
    this.courage = courage;
    this.firepower = firepower;
    this.skill = skill;
  }

  getOverallRating(): number {
    return this.strength + this.intelligence + this.speed + this.endurance + this.firepower;
  }
}

export class Transformer extends Specs {
  name: string;
  type: TransformerType;
  constructor(
    name: string,
    type: TransformerType = TransformerType.Autobot,
    strength?: number,
    intelligence?: number,
    speed?: number,
    endurance?: number,
    rank?: number,
    courage?: number,
    firepower?: number,
    skill?: number
  ) {
    super(
      strength,
      intelligence,
      speed,
      endurance,
      rank,
      courage,
      firepower,
      skill
    );
    this.name = name;
    this.type = type;
  }
}
