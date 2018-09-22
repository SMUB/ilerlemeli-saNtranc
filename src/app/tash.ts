export enum Hamlecinsi { yürüme, yeme, yiyerekyürüme }
export enum Oyuncu { siyah, beyaz }

class Hamle {
    public i: number;
    public j: number;
    public cins: Hamlecinsi;
    public tekrar: number;
}

// TODO farklı cinste taşları alt class olarak tanımla.
// TODO Taş hareketlerini matematik formül olarak genelle

export class Tash {
    private resim: string;
    protected hamleler: Hamle[];
    public oyuncu: Oyuncu;

    constructor(resim: string, oyuncu: Oyuncu) {
        this.resim = resim;
        this.oyuncu = oyuncu;
    }

    getResim() {
        return this.resim;
    }

    getHamleler() {
        return this.hamleler;
    }
}

export class AltAt extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/3.png', oyuncu);
        this.hamleler = [
            { i: 2, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 2, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: -2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}


export class ÜstAt extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/-3.png', oyuncu);
        this.hamleler = [
            { i: 2, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 2, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -2, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: -2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -2, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}

export class AltPiyon extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/1.png', oyuncu);
        this.hamleler = [
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}

export class ÜstPiyon extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/-1.png', oyuncu);
        this.hamleler = [
            { i: 1, j: 0, cins: Hamlecinsi.yürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 1, cins: Hamlecinsi.yeme, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yeme, tekrar: 1 } as Hamle
        ];
    }
}

export class AltFil extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/4.png', oyuncu);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle
        ];
    }
}

export class ÜstFil extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/-4.png', oyuncu);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle
        ];
    }
}

export class AltKale extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/2.png', oyuncu);
        this.hamleler = [
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle
        ];
    }
}

export class ÜstKale extends Tash {
    constructor(oyuncu: Oyuncu) {
        super('./assets/-2.png', oyuncu);
        this.hamleler = [
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle
        ];
    }
}

export class Vezir extends Tash {
    constructor(resim: string, oyuncu: Oyuncu) {
        super(resim, oyuncu);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 8 } as Hamle
        ];
    }
}

export class Şah extends Tash {
    constructor(resim: string, oyuncu: Oyuncu) {
        super(resim, oyuncu);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyürüme, tekrar: 1 } as Hamle
        ];
    }
}
