export enum Hamlecinsi { yurume, yeme, yiyerekyurume }
export enum Oyuncu { siyah, beyaz }

class Hamle {
    public i: number;
    public j: number;
    public cins: Hamlecinsi;
    public tekrar: number;
}

// TODO farkli cinste taslari alt class olarak tanimla.
// TODO Tas hareketlerini matematik formul olarak genelle

export class Tas {
    private resim: string;
    protected hamleler: Hamle[];
    public oyuncu: Oyuncu;
    private point: number;

    constructor(resim: string, oyuncu: Oyuncu, point: number) {
        this.resim = resim;
        this.oyuncu = oyuncu;
        this.point = point;
    }

    getResim() {
        return this.resim;
    }

    getHamleler() {
        return this.hamleler;
    }

    getPoint() {
        return this.point;
    }
}

export class At extends Tas {
    constructor(oyuncu: Oyuncu) {

        let texture = '';
        if (oyuncu === Oyuncu.beyaz) {
            texture = './assets/-3.png';
        } else {
            texture = './assets/3.png';
        }

        super(texture, oyuncu, 3);

        this.hamleler = [
            { i: 2, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 2, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -2, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -2, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 1, j: 2, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 1, j: -2, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: 2, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: -2, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle
        ];
    }
}

export class AltPiyon extends Tas {
    constructor(oyuncu: Oyuncu) {
        super('./assets/1.png', oyuncu, 1);
        this.hamleler = [
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle
        ];
    }
}

export class UstPiyon extends Tas {
    constructor(oyuncu: Oyuncu) {
        super('./assets/-1.png', oyuncu, 1);
        this.hamleler = [
            { i: 1, j: 0, cins: Hamlecinsi.yurume, tekrar: 1 } as Hamle,
            { i: 1, j: 1, cins: Hamlecinsi.yeme, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yeme, tekrar: 1 } as Hamle
        ];
    }
}

export class Fil extends Tas {
    constructor(oyuncu: Oyuncu) {

        let texture = '';
        if (oyuncu === Oyuncu.beyaz) {
            texture = './assets/-4.png';
        } else {
            texture = './assets/4.png';
        }

        super(texture, oyuncu, 4);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle
        ];
    }
}

export class Kale extends Tas {
    constructor(oyuncu: Oyuncu) {

        let texture = '';
        if (oyuncu === Oyuncu.beyaz) {
            texture = './assets/-2.png';
        } else {
            texture = './assets/2.png';
        }

        super(texture, oyuncu, 2);
        this.hamleler = [
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle
        ];
    }
}

export class Vezir extends Tas {
    constructor(resim: string, oyuncu: Oyuncu) {
        super(resim, oyuncu, 1);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 8 } as Hamle
        ];
    }
}

export class Sah extends Tas {
    constructor(resim: string, oyuncu: Oyuncu) {
        super(resim, oyuncu, 1);
        this.hamleler = [
            { i: 1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: -1, j: 0, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 0, j: 1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle,
            { i: 0, j: -1, cins: Hamlecinsi.yiyerekyurume, tekrar: 1 } as Hamle
        ];
    }
}

export class LootBox extends Tas {
    constructor() {
        super('./assets/-7.png', Oyuncu.beyaz, 1);
        this.hamleler = [];
    }
}