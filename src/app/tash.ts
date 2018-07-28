export enum hamlecinsi { yürüme, yeme, yiyerekyürüme }

class Hamle {
    public i: number;
    public j: number;
    public cins: hamlecinsi;
    public tekrar: number;
}

// TODO farklı cinste taşları alt class olarak tanımla.
// TODO Taş hareketlerini matematik formül olarak genelle

export class Tash {
    private resim: string;
    protected hamleler: Hamle[];

    constructor(resim: string) {
        this.resim = resim;
    }

    getResim() {
        return this.resim;
    }

    getHamleler() {
        return this.hamleler;
    }
}

export class At extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 2, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 2, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 2, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: -2, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 2, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -2, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}

export class AltPiyon extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: -1, j: 0, cins: hamlecinsi.yürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: hamlecinsi.yeme, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: hamlecinsi.yeme, tekrar: 1 } as Hamle
        ];
    }
}

export class ÜstPiyon extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 1, j: 0, cins: hamlecinsi.yürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 1, cins: hamlecinsi.yeme, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: hamlecinsi.yeme, tekrar: 1 } as Hamle
        ];
    }
}

export class Fil extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle
        ];
    }
}

export class Kale extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 0, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 0, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle
        ];
    }
}

export class Vezir extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: -1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 0, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle,
            { i: 0, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: Infinity } as Hamle
        ];
    }
}

export class Şah extends Tash {
    constructor(resim: string) {
        super(resim);
        this.hamleler = [
            { i: 1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 0, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 0, j: 1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 0, j: -1, cins: hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}
