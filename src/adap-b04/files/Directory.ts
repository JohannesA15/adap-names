import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    // @methodtype initialization-method
    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    // @methodtype assertion-method
    public hasChildNode(cn: Node): boolean {
        this.assertIsValidNodeInputAsPrecondition(cn);
        return this.childNodes.has(cn);
    }

    // @methodtype mutation-method
    public addChildNode(cn: Node): void {
        this.assertIsValidNodeInputAsPrecondition(cn);
        this.childNodes.add(cn);
    }

    // @methodtype assertion-method
    public removeChildNode(cn: Node): void {
        this.assertIsValidNodeInputAsPrecondition(cn);
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    // @methodtype assertion-method
    public assertIsValidNodeInputAsPrecondition(cn: Node): void {
        if (!cn || !(cn instanceof Node)) {
            throw new IllegalArgumentException("Argument must be an instance of Node");
        }
    }
}