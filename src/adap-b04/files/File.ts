import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    // @methodtype initialization-method
    constructor(baseName: string, parent: Directory) {
        // Precondition checks are done in the superclass
        super(baseName, parent);
    }

    // Not futher preconditions necessary, postconditions were not required by B04 homework sheet

    public open(): void {
        // do something
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        // do something
    }

    // @methodtype get-method
    protected doGetFileState(): FileState {
        return this.state;
    }

}