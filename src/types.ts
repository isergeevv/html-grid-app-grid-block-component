import type { GridAppComponentConnectorData, GridAppComponentElementData } from '@isergeevv/html-grid-app-base';

export interface GridAppBlockComponentData extends GridAppComponentElementData {
  title: string;
  body: string;
  connectors: GridAppComponentConnectorData[];
}
