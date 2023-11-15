interface TableColumn {
    id: string;  // Unique identifier for each header cell
    label: string; // Display text for the header cell
  }
  
  interface TableData {
    id: number; // Unique identifier for each row, used for the `key` prop
    values: (string | number)[]; // Array of values for each cell in the row
  }
  
  interface GenericTableProps {
    columns: TableColumn[];
    data: TableData[];
  }
  