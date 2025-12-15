import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { MethodFailedException } from "../common/MethodFailedException";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    // @methodtype initialization-method
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.assertIsValidDelimiterAsPrecondition(delimiter);
        if (delimiter.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
        this.delimiter = delimiter;
    }

    // @methodtype command-method
    public clone(): Name {
        return Object.create(this);
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        this.assertIsValidDelimiterAsPrecondition(delimiter);
        const old = this.clone();
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                result += delimiter;
            }
        }

        // postconditions
        this.assertReturnIsValidStringAsPostcondition(result);
        this.assertMethodMutationAsPostcondition(old);
        // no class invariant checks needed
        return result;
    }

    // @methodtype conversion-method
    public toString(): string {
        return this.asDataString();
    }

    // @methodtype conversion-method
    public asDataString(): string {
        const old = this.clone();
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            let component = this.getComponent(i);
            result += this.escapeComponent(component);
            if (i < this.getNoComponents() - 1) {
                result += this.delimiter;
            }
        }

        // postconditions
        this.assertReturnIsValidStringAsPostcondition(result);
        this.assertMethodMutationAsPostcondition(old);
        // no class invariant checks needed
        return result;
    }

    // @methodtype boolean-query-method
    public isEqual(other: Name): boolean {
        this.assertIsValidNameAsPrecondition(other);
        let result = true;
        if (this.getNoComponents() !== other.getNoComponents()) {
            result = false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                result = false;
                break;
            }
        }

        // postcondition
        this.assertIsBooleanAsPostCondition(result);
        // no class invariant checks needed
        return result;
    }

    // @methodtype get-method
    public getHashCode(): number {
        let hash = 0;
        const dataString = this.asDataString();
        for (let ch of dataString) {
            hash += ch.charCodeAt(0);
        }

        // postcondition
        this.assertHashNumberAsPostCondition(hash);
        // no class invariant checks needed
        return hash;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        const result = (this.getNoComponents() === 0);
        // postcondition
        this.assertIsBooleanAsPostCondition(result);
        // no class invariant checks needed
        return result;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        // no class invariant checks needed
        return this.delimiter;
    }

    // @methodtype get-method
    abstract getNoComponents(): number;
    // @methodtype get-method
    abstract getComponent(i: number): string;
    // @methodtype set-method
    abstract setComponent(i: number, c: string): void;
    // @methodtype command-method
    abstract insert(i: number, c: string): void;
    // @methodtype command-method
    abstract append(c: string): void;
    // @methodtype command-method
    abstract remove(i: number): void;

    // @methodtype command-method
    public concat(other: Name): void {
        this.assertIsValidNameAsPrecondition(other);
        const oldLength = this.getNoComponents();
        const otherLength = other.getNoComponents();
        const old = this.clone();
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }
        // postcondition
        this.assertResultHasCorrectLengthAsPostCondition(oldLength, otherLength);
        // no class invariant checks needed
    }

    // Helper methods

    // @methodtype assertion-method
    public assertIsValidIndexAsPrecondition(i: number): void {
        if (typeof i !== "number") {
            throw new IllegalArgumentException("TypeError: Index must be a number")
        }
        this.assertIsValidIndex(i);
    }

    // @methodtype assertion-method
    public assertIsValidIndex (i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new IllegalArgumentException("Invalid index value");
        }   
    }

    // @methodtype conversion-method
    public escapeComponent(c: string): string {
        let escaped = "";
        for (let i = 0; i < c.length; i++) {
            const ch = c.charAt(i);
            if (ch === this.delimiter || ch === ESCAPE_CHARACTER) {
                escaped += ESCAPE_CHARACTER;
            }
            escaped += ch;
        }
        return escaped;
    }

    // @methodtype assertion-method
    public assertIsValidStringAsPrecondition(s: string): void {
        if (!s || s.length === 0 || typeof s !== "string") {
            throw new IllegalArgumentException("Argument must be a non-empty string");
        }
    }

    // @methodtype assertion-method
    public assertIsValidNameAsPrecondition(n: Name): void {
        if (!n || !(n instanceof AbstractName)) {
            throw new IllegalArgumentException("Argument must be of type Name");
        }
    }
    
    // @methodtype assertion-method
    public assertIsValidDelimiterAsPrecondition(s: string): void {
        this.assertIsValidStringAsPrecondition(s);
        if (s.length !== 1) {
            throw new IllegalArgumentException("Delimiter must be a single character");
        }
    }

        // postcondition
    public assertReturnIsValidStringAsPostcondition(s: string): void {
        if (typeof s !== "string") {
            throw new MethodFailedException("TypeError: Result is not a string")
        }
    }

    // postcondition
    public assertMethodMutationAsPostcondition(old: Name): void {
        if (!this.isEqual(old)) {
            throw new MethodFailedException("The method should not mutate the object")
        }
    }

    // postcondition
    public assertIsBooleanAsPostCondition(result: boolean): void {
        if (typeof result != "boolean") {
            throw new MethodFailedException("TypeError: Must be a boolean")
        }
    }

    // postcondition
    public assertHashNumberAsPostCondition(hash: number): void {
        if (typeof hash !== "number") {
            throw new MethodFailedException("TypeError: Hash must be a number")
        }
    }

    // postcondition
    public assertResultHasCorrectLengthAsPostCondition(oldLength: number, otherLength: number) {
        if (this.getNoComponents() !== oldLength + otherLength) {
            throw new MethodFailedException("New length not correct")
        }
    }
}