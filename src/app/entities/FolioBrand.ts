export type FolioBrandProps = {
  readonly brand: string
  readonly ratio: string
  readonly quantity: string
  readonly price: string
  readonly themeName: string
}

export class FolioBrand {
  constructor(private prop: FolioBrandProps) {}

  getBrand(): string {
    return this.prop.brand;
  }

  getRatio(): string {
    return this.prop.ratio;
  }

  getQuantity(): string {
    return this.prop.quantity;
  }

  getPrice(): string {
    return this.prop.price;
  }

  getThemeName(): string {
    return this.prop.themeName;
  }
}