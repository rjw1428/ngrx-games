export class Player {
    constructor(
        public id: number,
        public name: string,
        public symbol: string,
        public color: string
    ) {}

    toString() {
        return `${this.id}: ${this.name} (${this.symbol}) `
    }
}
