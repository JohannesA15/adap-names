import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { Name } from "../names/Name";
import { Directory } from "./Directory";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    // @methodtype initialization-method
    constructor(bn: string, pn: Directory) {
        this.assertIsValidStringInputAsPrecondition(bn);
        this.assertIsValidDirectoryInputAsPrecondition(pn);
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this -> to set the root node
        this.initialize(pn);
    }

    // @methodtype mutation-method
    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.addChildNode(this);
    }

    // @methodtype mutation-method
    public move(to: Directory): void {
        this.assertIsValidDirectoryInputAsPrecondition(to);
        this.parentNode.removeChildNode(this);
        to.addChildNode(this);
        this.parentNode = to;
    }

    // @methodtype get-method
    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    // @methodtype get-method
    public getBaseName(): string {
        return this.doGetBaseName();
    }


    // @methodtype do-set-method
    protected doGetBaseName(): string {
        return this.baseName;
    }

    // @methodtype mutation-method
    public rename(bn: string): void {
        // Precondition
        this.assertIsValidStringInputAsPrecondition(bn);
        this.doSetBaseName(bn);
    }

    // @methodtype do-set-method
    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    // @methodtype assertion-method
    public assertIsValidStringInputAsPrecondition(bn: string): void {
        if (!bn || bn.length === 0 || typeof bn !== "string") {
            throw new IllegalArgumentException("Argument must be a non-empty string");
        }
    }

    // @methodtype assertion-method
    public assertIsValidDirectoryInputAsPrecondition(pn: Directory): void {
        if (!pn || !(pn instanceof Directory)) {
            throw new IllegalArgumentException("Argument must be an instance of Directory");
        }
    }

}
