class Hamle {
    public i: number;
    public j: number;
}

// TODO farklı cinste taşları alt class olarak tanımla.
// TODO Taş hareketlerini matematik formül olarak genelle

export class Tash {
    private resim: string;
    private hamleler: Hamle[];

    constructor(resim: string) {
        this.resim = resim;
        this.hamleler = [{ i: 1, j: 0 } as Hamle];
    }

    getResim() {
        return this.resim;
    }

    getHamleler() {
        return this.hamleler;
    }
}
