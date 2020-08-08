import { Model } from '../Model';

export class Note extends Model {

    public title: string;
    public created_at: number;
    public updated_at: number;
    public ownerUsername: string;
    public tags: Array<string>;
    public content: string;

    constructor(props: Note | object) {
        super(props);
    }
}
