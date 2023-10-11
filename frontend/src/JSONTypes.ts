export interface Element {
  atomicNumber: number,
  symbol: string,
  type: string,
  family: string,
  name: string,
  group: number,
  period: number,
  mass: number,
  electronegativity: number,
  oxidations: number[],
  block: string,
  configuration: string[],
  electrons: number[],
  color: string,
  image: string
}

export interface ElementCount {
  element: Element,
  count: number,
  oxidation: number
}

export interface Ion {
  name: string,
  elements: ElementCount[]
  color: string,
  oxidation: number,
  mainElement: Element
}

export interface Klass {
  name: string,
  isOrganic: boolean,
  reactsWith: string[],
  uniqueReactions: number[],
  suffix: string,
  article: string,
  image: string
}

export enum Properties {
  ACIDIC = 'Acidic',
  BASIC = 'Basic',
  AMPHOTERIC = 'Amphoteric',
  NEUTRAL = 'Neutral'
}

export interface Substance {
  formula: string,
  name: string,
  color: string,
  smell: string,
  trivialNames: string,
  properties: Properties,
  klass: Klass,
  article: string,
  image: string
}

export interface CovalentSubstance {
  elements: ElementCount[]
}

export interface IonicSubstance {
  cation: Ion,
  anion: Ion
}

export interface Reaction {
  covalentReactives: CovalentSubstance[],
  ionicReactives: CovalentSubstance[],
  covalentProducts: CovalentSubstance[],
  ionicProducts: CovalentSubstance[],
  conditions: string,
  video: string
}