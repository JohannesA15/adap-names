import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype initialization-method
    constructor(source: string, delimiter?: string) {
        this.name = source;
        if (delimiter) {
            this.delimiter = delimiter;
        }
        this.noComponents = this.name.split(this.delimiter).length;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.name;
    }

    // @methodtype conversion-method
    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;}

    // @methodtype get-method
    public getNoComponents(): number {
        return this.noComponents;
    }

    // @methodtype get-method
    public getComponent(x: number): string {
        this.assertIsValidIndex(x);
        const components = this.name.split(this.delimiter);
        return components[x];
    }

    // @methodtype set-method
    public setComponent(n: number, c: string): void {
        this.assertIsValidIndex(n);
        const components = this.name.split(this.delimiter);
        components[n] = this.escapeComponent(c);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public insert(n: number, c: string): void {
        const components = this.name.split(this.delimiter);
        components.splice(n, 0, this.escapeComponent(c));
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public append(c: string): void {
        this.name += this.delimiter + this.escapeComponent(c);
        this.noComponents++;
    }

    // @methodtype command-method
    public remove(n: number): void {
        this.assertIsValidIndex(n);
        const components = this.name.split(this.delimiter);
        components.splice(n, 1);
        this.name = components.join(this.delimiter);
        this.noComponents = components.length;
    }

    // @methodtype command-method
    public concat(other: Name): void {
        this.noComponents = this.getNoComponents() + other.getNoComponents();
        this.name += this.delimiter + other.asString();
    }

    // @methodtype helper-method
    private assertIsValidIndex(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new RangeError("Invalid index value");
        }
    }

    // @methodtype conversion-method
    private escapeComponent(c: string): string {
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