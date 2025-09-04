import { GridAppComponentElementData, GridAppComponentConnectorData, GridAppComponent, GridAppGrid } from '@isergeevv/html-grid-app-base';

interface GridAppBlockComponentData extends GridAppComponentElementData {
    title: string;
    body: string;
    connectors: GridAppComponentConnectorData[];
}

declare class GridAppBlockComponent extends GridAppComponent {
    constructor(grid: GridAppGrid);
    get headElement(): HTMLDivElement;
    get bodyElement(): HTMLDivElement;
    get title(): string;
    get body(): string;
    private _createConnector;
    setTitle(value: string): void;
    setBody(value: string): void;
    copy(): GridAppBlockComponent;
    import(data: GridAppBlockComponentData): void;
    export(): GridAppBlockComponentData;
}

export { GridAppBlockComponent };
