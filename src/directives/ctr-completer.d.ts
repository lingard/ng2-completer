import { EventEmitter, OnInit } from "@angular/core";
import { CompleterItem } from "../components/completer-item";
export interface CompleterList {
    search(term: string): void;
    clear(): void;
}
export interface CompleterDropdown {
    clear(): void;
    selectCurrent(): void;
    nextRow(): void;
    prevRow(): void;
}
export declare class CtrCompleter implements OnInit {
    selected: EventEmitter<CompleterItem>;
    highlighted: EventEmitter<CompleterItem>;
    private list;
    private dropdown;
    private _hasHighlited;
    private hasSelected;
    constructor();
    ngOnInit(): void;
    registerList(list: CompleterList): void;
    registerDropdown(dropdown: CompleterDropdown): void;
    onHighlighted(item: CompleterItem): void;
    onSelected(item: CompleterItem): void;
    search(term: string): void;
    clear(): void;
    selectCurrent(): void;
    nextRow(): void;
    prevRow(): void;
    hasHighlited(): boolean;
}