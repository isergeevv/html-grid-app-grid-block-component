import { GridAppGrid, GridAppComponentConnector, CONNECTOR_TYPES, GridAppComponent } from '@isergeevv/html-grid-app-base';
import type { GridAppComponentConnectorData, GridAppComponentConnectorHTMLElement } from '@isergeevv/html-grid-app-base';
import type { GridAppBlockComponentData } from './types';

export class GridAppBlockComponent extends GridAppComponent {
  constructor(grid: GridAppGrid) {
    super(grid, {
      type: 'component',
      label: 'block',
      defaultBackgroundColor: [40, 46, 48],
      defaultTextColor: [167, 178, 184],
      size: { w: 50, h: 50 },
      minSize: { w: 50, h: 50 },
      resize: [],
      container: false,
    });

    const componentHeadElement = document.createElement('div');
    componentHeadElement.classList.add(`component-head`);
    componentHeadElement.innerText = 'Block Title';
    this.element.append(componentHeadElement);

    const componentBodyElement = document.createElement('div');
    componentBodyElement.classList.add(`component-body`);
    componentBodyElement.innerText = 'Content goes here...';
    this.element.append(componentBodyElement);

    this._createConnector('left', CONNECTOR_TYPES.INPUT);
    this._createConnector('right', CONNECTOR_TYPES.OUTPUT);
  }

  get headElement(): HTMLDivElement {
    return this.element.querySelector(`.component-head`) as HTMLDivElement;
  }

  get bodyElement(): HTMLDivElement {
    return this.element.querySelector(`.component-body`) as HTMLDivElement;
  }

  get title(): string {
    return this.headElement.innerText;
  }

  get body(): string {
    return this.bodyElement.innerText;
  }

  private _createConnector(label: string, connectorType: CONNECTOR_TYPES): void {
    const connector = new GridAppComponentConnector(this.grid, {
      label: label,
      connectorType: connectorType,
    });

    this.element.append(connector.element);
  }

  setTitle(value: string): void {
    this.headElement.innerText = value;
  }

  setBody(value: string): void {
    this.bodyElement.innerText = value;
  }

  copy(): GridAppBlockComponent {
    const newComponent = this.grid.createElement(this.type, this.label) as GridAppBlockComponent;

    newComponent.setPosition(this.position);
    newComponent.setBackgroundColor(this.backgroundColor);
    newComponent.setTextColor(this.textColor);
    newComponent.setTitle(this.title);
    newComponent.setBody(this.body);

    return newComponent;
  }

  import(data: GridAppBlockComponentData): void {
    this.setId(data.id);
    this.setPosition(data.position);
    this.setSize(data.size);
    this.setBackgroundColor(data.backgroundColor);
    this.setTextColor(data.textColor);
    this.setTitle(data.title);
    this.setBody(data.body);

    for (const connectorData of data.connectors) {
      this._createConnector(connectorData.label, connectorData.connectorType);
    }
  }

  export(): GridAppBlockComponentData {
    const id = this.id;
    const type = this.type;
    const label = this.label;
    const position = this.position;
    const size = this.size;
    const backgroundColor = this.backgroundColor;
    const textColor = this.textColor;
    const title = this.title;
    const body = this.body;

    const connectors: GridAppComponentConnectorData[] = [];

    const connectorElements = this.element.querySelectorAll('.app-component-connector');
    for (const connectorElement of connectorElements) {
      const connector = (connectorElement as GridAppComponentConnectorHTMLElement).gridAppInstance;

      connectors.push({
        label: connector.label,
        connectorType: connector.connectorType,
      });
    }

    return {
      id: id,
      type: type,
      label: label,
      position: { x: position.x, y: position.y },
      size: { w: size.w, h: size.h },
      backgroundColor: backgroundColor,
      textColor: textColor,
      title: title,
      body: body,
      connectors: connectors,
    };
  }
}
