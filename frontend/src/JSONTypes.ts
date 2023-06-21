export interface Element {
  "atomic_number": number,
  "symbol": string,
  "type": string,
  "family": string,
  "name": string,
  "group": number,
  "period": number,
  "mass": number,
  "oxidations": string[];
  "color": string;
}

export interface Klass {
  "name": string,
  "description": string,
  "is_organic": boolean,
  "reacts_with": string[],
  "unique_reactions": number[]
}