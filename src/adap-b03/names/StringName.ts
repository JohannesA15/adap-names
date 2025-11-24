import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    // @methodtype initialization-method
    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.name.split(this.delimiter).length;
    }

    // @methodtype command-method
    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

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
}