export class EKEvent {

  constructor(
    public type: string,
    public amount: number,
    public categoryID: string,
    public description: string,
    public id?: string,
    public catName?: string,
    public createdAt?: number,
    public updatedAt?: number,

  ) { }
}
