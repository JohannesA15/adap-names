import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    // @methodtype initialization-method
    constructor(source: string[], delimiter?: string) {
        this.components = source;
        if (delimiter) {
            this.delimiter = delimiter;
        }
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.components.join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        let result = "";
        
            for (let i = 0; i < this.getNoComponents(); i++) {
              let component = this.getComponent(i);
              let escapedComponent = "";
        
              for (let char of component) {
                if (char === ESCAPE_CHARACTER || char === DEFAULT_DELIMITER) {
                  escapedComponent += ESCAPE_CHARACTER;
                }
        
                escapedComponent += char;
              }
        
              result += escapedComponent;
        
              // Add delimiter if not the last component
              if (i < this.getNoComponents() - 1) {
                result += DEFAULT_DELIMITER;
              }
            }
        
            return result;
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype boolean-query-method
    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        this.assertIsValidIndex(i);
        return this.components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        this.assertIsValidIndex(i);
        this.components[i] = c;
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        if (i < 0 || i > this.getNoComponents()) {
            throw new RangeError("Invalid index value");
        }
        this.components.splice(i, 0, c);
    }

    // @methodtype command-method
    public append(c: string): void {
        this.components.push(c);
    }

    // @methodtype command-method
    public remove(i: number): void {
        this.assertIsValidIndex(i);
        this.components.splice(i, 1);
    }

    // @methodtype command-method
    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }
    }

    // @methodtype helper-method
    private assertIsValidIndex(i: number): void {
        if (i < 0 || i >= this.getNoComponents()) {
            throw new RangeError("Invalid index value");
        }
    }

}