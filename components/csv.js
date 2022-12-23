import Papa from "papaparse";
import { useState } from "react";
import React from "react";

const CSV = () => {

       // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const data = [];

  const addtoList = () => {

    console.log('values = '+ values);

    for(let i = 0; i < values.length; i++){
        data.push({
            id: i,
            name: values[i][0],
            email: values[i][1],
            address: values[i][2]
        })
    }


  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
        console.log('values = '+ values)
      },
    });
  };

    return (


<form className="space-y-6" action="#" method="POST">

    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Upload</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload CSV with contributor information here:
          </p>
        </div>
              <div className="mt-1 flex rounded-md">

                <input
                 type="file"
                 name="file"
                 accept=".csv"
                 onChange={changeHandler}
                 style={{ display: "block", margin: "10px auto" }}
                />

          </div>
          <button onClick={addtoList}>Add to List</button>
      </div>
    </div>

    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">

      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                <tr>
                    {tableRows.map((rows, index) => {
                         return (
                     <th key={index}>{rows}</th>
                     )})}
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {values.map((value, index) => {
                    return (
                   <tr key={index}>
                     {value.map((val, i) => {
                        
                       return  <td key={i} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val}</td>
                    })}
                    </tr>
                    );
            })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>   




    <div className="flex justify-end">
      <button
        type="button"
        className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Upload
      </button>
    </div>
  </form>

    );
}


export default CSV;