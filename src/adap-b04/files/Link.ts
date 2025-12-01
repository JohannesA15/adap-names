import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Link extends Node {

    protected targetNode: Node | null = null;

    // @methodtype initialization-method
    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.assertIsValidNodeInputAsPrecondition(tn);
            this.targetNode = tn;
        }
    }

    // @methodtype get-method
    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    // @methodtype set-method
    public setTargetNode(target: Node): void {
        this.assertIsValidNodeInputAsPrecondition(target);
        this.targetNode = target;
    }

    // @methodtype get-method
    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    // @methodtype mutation-method
    public rename(bn: string): void {
        this.assertIsValidStringInputAsPrecondition(bn);
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    // @methodtype assertion-method
    protected ensureTargetNode(target: Node | null): Node {
        this.assertIsValidNodeInputAsPrecondition(target as Node);
        const result: Node = this.targetNode as Node;
        return result;
    }

    // @methodtype assertion-method
    protected assertIsValidNodeInputAsPrecondition(tn: Node): void {
            if (!tn || !(tn instanceof Node)) {
                throw new IllegalArgumentException("Argument must be an instance of Node");
            }
        }
}