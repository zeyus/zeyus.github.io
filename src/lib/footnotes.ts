export class Footnotes extends Array<Footnote> {
    addFootnote(footnote: Footnote): void {
        this.push(footnote);
    }
    constructor(...input: any[]) {
        super(...input);
    }

}
