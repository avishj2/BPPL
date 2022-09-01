export class LayerData 
{
    key: string;
    value : string;
}

export class LayerTabData
{
    Data: LayerData[];
    /**
     *
     */
    constructor() {
        this.Data = [];
    }
}


export class AllTabsData
{
    AllData : LayerTabData[];
    /**
     *
     */
    constructor() {
        this.AllData = [];
    }
}