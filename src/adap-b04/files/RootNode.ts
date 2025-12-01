import { Name } from "../names/Name";
import { StringName } from "../names/StringName";
import { Directory } from "./Directory";

export class RootNode extends Directory {

    protected static ROOT_NODE: RootNode = new RootNode();

    // @methodtype get-method
    public static getRootNode() {
        return this.ROOT_NODE;
    }

    // @methodtype initialization-method
    constructor() {
        super("", new Object as Directory);
    }

    // @methodtype mutation-method
    protected initialize(pn: Directory): void {
        this.parentNode = this;
    }

    // @methodtype get-method
    public getFullName(): Name {
        return new StringName("", '/');
    }

    // @methodtype mutation-method
    public move(to: Directory): void {
        // null operation
    }

    // @methodtype do-set-method
    protected doSetBaseName(bn: string): void {
        // null operation
    }

}