

import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Papa from "papaparse";
import React from "react";

const CSV = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [newStudent, setNewStudent] = useState(null);
       // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      submitted: "Yes",
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      submitted: "No",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      submitted: "No",
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      submitted: "Yes",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Submitted",
      dataIndex: "submitted",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];


  const addtoList = () => {

    console.log('values = '+ values);

    let objects = [];

     const firstValue = dataSource[dataSource.length - 1].id;
      for (let i = 0; i < values.length; i ++) {
        objects.push({
          id: firstValue + 1 + i,
          name: values[i][1],
          email: values[i][2],
          address: values[i][3]
        });
       
      }
      console.log('objects = '+ JSON.stringify(objects))

  setDataSource([...dataSource, ...objects]);

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


  
  const onAddStudent = () => {
    setIsModalVisible(true);

    const newStudent = {
      id: dataSource[dataSource.length - 1].id + 1,
      name: "Name",
      email:  "test@gmail.com",
      submitted: "Yes",
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const handleOk = () => {
    setIsModalVisible(false);


  }

  const handleCancel = () => {
    setIsModalVisible(false);
  };


 
    return (
<>

      <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new Contributor</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>

        <Modal
        title="Add a new contributor"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <Input placeholder="Submitted" value={submitted} onChange={(e) => setSubmitted(e.target.value)} />
      </Modal>
      </header>
    </div>

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
          <Button onClick={addtoList}>Add to List</Button>
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

  </form>
  </>

    );
}

export default CSV;
