import React from "react";
import "./styles.css";
import data from "./data";

/**
 *
 * SOURCE https://github.com/jbetancur/react-data-table-component/blob/master/stories/DataTable/Basic/ExportCSV.stories.js
 */

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
const convertArrayOfObjectsToCSV = array => {
  let result;

  const columnDelimiter = ",";
  const lineDelimiter = "\n";
  const keys = Object.keys(data[0]);

  result = "";
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  array.forEach(item => {
    let ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;

      result += item[key];
      // eslint-disable-next-line no-plusplus
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
};

// Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
const downloadCSV = array => {
  const link = document.createElement("a");
  let csv = convertArrayOfObjectsToCSV(array);
  if (csv == null) return;

  const filename = "export.csv";

  if (!csv.match(/^data:text\/csv/i)) {
    csv = `data:text/csv;charset=utf-8,${csv}`;
  }

  link.setAttribute("href", encodeURI(csv));
  link.setAttribute("download", filename);
  link.click();
};

const ExportCSV = ({ onExport }) => (
  <button onClick={e => onExport(e.target.value)}>Export CSV</button>
);

export default function App() {
  return (
    <div className="App">
      <h1>Export CSV Example</h1>
      <ExportCSV onExport={() => downloadCSV(data)} />
    </div>
  );
}
