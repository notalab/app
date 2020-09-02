import { Model } from '../Model';

export class Note extends Model {

    public id: number;
    public title: string;
    public created_at: number;
    public updated_at: number;
    public ownerUsername: string;
    public tags: Array<string>;
    public content: string;
    public color?: string; // for mass note purposes only, as querying notebook color is too intensive

    constructor(props: Note | object) {
        super(props);
    }
}
