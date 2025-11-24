import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    // @methodtype initialization-method
    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    // @methodtype command-method
    public clone(): Name {
        return Object.create(this);
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            result += this.getComponent(i);
            if (i < this.getNoComponents() - 1) {
                result += delimiter;
            }
        }
        return result;
    }

    // @methodtype conversion-method
    public toString(): string {
        return this.asDataString();
    }

    // @methodtype conversion-method
    public asDataString(): string {
        let result = "";
        for (let i = 0; i < this.getNoComponents(); i++) {
            let component = this.getComponent(i);
            result += this.escapeComponent(component);
            if (i < this.getNoComponents() - 1) {
                result += this.delimiter;
            }
        }
        return result;
    }

    // @methodtype boolean-query-method
    public isEqual(other: Name): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    // @methodtype get-method
    public getHashCode(): number {
        let hash = 0;
        const dataString = this.asDataString();
        for (let ch of dataString) {
            hash += ch.charCodeAt(0);
        }
        return hash;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
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
        for (let i = 0; i < other.getNoComponents(); i++) { 
            this.append(other.getComponent(i));
        }
    }


    // Helper methods

    // @methodtype assertion-method
    public assertIsValidIndex(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new RangeError("Invalid index value");
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
}