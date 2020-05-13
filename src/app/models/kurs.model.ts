export class Kurs {
  constructor(
    public exName: string,
    public ins: number,
    public out: number,
    public amount: number,
    public minamount: number,
    public from: number,
    public to: number
  ) {}
}
