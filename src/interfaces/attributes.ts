interface ITraitValuesStat {
  value: string;
  rarity: number;
}

export interface IAttribute {
  traitName: string;
  traitValuesStat: ITraitValuesStat[];
  percent: number;
}
