# Part 1: The Transformation Company

## Description

Aequilibrium does love transforming… people, lives, teams, companies. And there’s no better
representation of transformation than Hasbro’s Transformers, the classic television series featuring
heroic Autobots raging their battle to destroy the evil forces of the Deceptions.

### Please watch this video: https://www.youtube.com/watch?v=nLS2N9mHWaw

The Transformers are at war and you are in charge of settling the score! For this part of the assignment
please build a web application that evaluates who wins a fight between the Autobots and the
Decepticons. You have the option to use any modern web framework. The input data can be static, there
is no need to persist any data or provide any back-end services. However, we will be testing the solution
against multiple use cases besides the basic example. Please include instructions on how to run and use
your solution.

### Here are the rules of a battle:
Each Transformer has the following criteria on their tech spec (see this for an example):
- Strength
- Intelligence
- Speed
- Endurance
- Rank
- Courage
- Firepower
- Skill
All of these criteria are ranked from 1 to 10.
The “Overall Rating” of a Transformer is the following formula:
Strength + Intelligence + Speed + Endurance + Firepower
Each Transformer must either be an Autobot or a Deception.
Your program should take the input that describes a group of Transformers and based on that group
displays:
- The number of battles
- The winning team
- The surviving members of the losing team

### The basic rules of the battle are:
- The teams should be sorted by rank and faced off one on one against each other in order to
determine a victor, the loser is eliminated
- A battle between opponents uses the following rules:
  - If any fighter is down 4 or more points of courage and 3 or more points of strength
compared to their opponent, the opponent automatically wins the face-off regardless of
overall rating (opponent has run away)

  - Otherwise, if one of the fighters is 3 or more points of skill above their opponent, they win
the fight regardless of the overall rating
  - The winner is the Transformer with the highest overall rating
- In the event of a tie, both Transformers are considered destroyed
- Any Transformers who don’t have a fight are skipped (i.e. if it’s a team of 2 vs. a team of 1, there’s
only going to be one battle)
- The team who eliminated the largest number of the opposing team is the winner

### Special rules:
- Any Transformer named Optimus Prime or Predaking wins his fight automatically regardless of
any other criteria
- In the event, either of the above face each other, or a duplicate of each other, the game
immediately ends with all competitors destroyed



## Instructions

Install the dependencies.

```sh
npm i
```

Run the application.

```sh
ng serve
```

Run the test.

```sh
ng test
```
