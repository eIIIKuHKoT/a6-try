export class EKEvent {

  constructor(
    public type: string,
    public amount: number,
    public categoryID: string,
    public description: string,
    public id?: string,
    public catName?: string,
    public createdAt?: any,
    public updatedAt?: any,

  ) { }
}
