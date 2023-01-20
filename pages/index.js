

import { Button, Table, Modal, Input, Select, Upload, message, notification } from "antd";
import { useState } from "react";
import { EditOutlined, DeleteOutlined, InboxOutlined  } from "@ant-design/icons";
import Papa from "papaparse";
import React from "react";

const { TextArea } = Input;

const CSV = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [newStudent, setNewStudent] = useState(null);
  const [pictureSubmitted, setPictureSubmitted ] = useState(false);
       // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  const [hover, setHover] = useState(false);

  //State to store the values
  const [values, setValues] = useState([]);
  const [modalData, setModalData] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [ submission, setSubmission ] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      submitted: "Yes",
      notes: "",
      submission: "Dear Person, I love you! You're great. Much love, Dan",
      picture: true
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      submitted: "No",
      notes: "",
      submission:  "",
      picture: false
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      submitted: "No",
      notes: "",
      submission:  "",
      picture: false
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      submitted: "Yes",
      notes: "",
      submission:  "Dear Person, I love you! You're sweet. Much love, Dan",
      picture: false
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
      title: "Submission",
      dataIndex: "submission",
      render: (record) => { 
        return (
          <>
          {record !== "" ?
          <a className="underline" onClick={ () => handleModalOpen(record)}>View Submission</a>
          :
          "No Submission"
          }
          </>
        )
      }
    },
    {
      key: "6",
      title: "Picture",
      dataIndex: "picture",
      render: (record) => { 
        return (
          <>
          {record !== false ?
          <a className="underline" onClick={ () => handleViewPicture(record)}>View Picture</a>
          :
          "No Picture Uploaded"
          }
          </>
        )
      }
    },
    {
      key: "7",
      title: "Notes",
      dataIndex: "notes",
    },
    {
      key: "7",
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


  const handleChangeUpload = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);

    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      notification.success({
        message: 'Picture successfully uploaded',
        duration: 2,
      });
      setPictureSubmitted(true);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = (data) => {
    setModalData(data);
    console.log("data is", data)
    setShowModal(true);
  };

  const displaySubmission = (data) => {
    return data ? data : "No message available";
  };

  const handleViewPicture = (record) => { // dont need the dataSource record, just the pictureUrl --> where is the pictureUrl coming from?
   // get the public url of the image
   var pictureUrl;
    window.open(pictureUrl, '_blank');
  }
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

  const handleDownloadCSV = () => {
    window.location = 'https://drive.google.com/file/d/1tmguV7yzHlKNc7vULFBrfKvkK6Tmw8WU/view?usp=sharing';
  }

  const handleHoverOn = () => {
    setHover(true);
  }
  
const handleHoverOff = () => {
    setHover(false);
  }
  
  const onAddStudent = () => {
    setIsModalVisible(true);

    // const randomNumber = parseInt(Math.random() * 1000);
    // const newStudent = {
    //   id: dataSource[dataSource.length - 1].id + 1,
    //   name: "Name " + randomNumber,
    //   email: randomNumber + "@gmail.com",
    //   address: "Address " + randomNumber,
    // };
    // setDataSource((pre) => {
    //   return [...pre, newStudent];
    // });
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
    console.log("record", record)
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  
    const newStudent = {
      id: dataSource.length + 1,
      name: name,
      email: email,
      submitted: submitted,
      submission: submission,
      picture: pictureSubmitted, // starts as an empty string
      notes: notes,
    };
  
    setDataSource([...dataSource, newStudent]);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


 
    return (
<>

      <Modal
        open={showModal}
        onCancel={handleModalClose}
        title="Submission"
        props={{ data: modalData }}
        footer={[
          <Button key="ok" type="primary" onClick={handleModalClose}>
            OK
          </Button>,
        ]}
      >
       { displaySubmission( modalData)}
      </Modal>

      <div className="App">
      <header className="App-header">
        <Button onClick={onAddStudent}>Add a new contributor</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Add a contributor"
          open={isEditing}
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
          <label>Name</label>
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <label>Email</label>
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <label>Submitted</label>
          <Select
            value={editingStudent?.submitted}
            onChange={(value) => {
              console.log("editingStudent", editingStudent);
              setEditingStudent((pre) => {
                return { ...pre, submitted: value };
              });
            }}
            options={[
              {
                value: 'Yes',
                label: 'Yes',
              },
              {
                value: 'No',
                label: 'No',
              }
            ]}
          />
           <label>Submission</label>
          <TextArea
            rows={10}
            type="textarea"
            maxLength={650}
            value={editingStudent?.submission}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, submission: e.target.value };
              });
            }}
          />
           <label>Picture Upload</label>
           <Upload
              name="avatar"
              listType="picture"
              className="avatar-uploader"
              showUploadList={false}
              action='api/upload'  // POST request to this api endpoint for picture upload --> need to make pictureSubmitted == true in the new record created 
              /* via --> 
              setEditingStudent((pre) => {
                return { ...pre, picture: true };
              });
              */
              onChange={handleChangeUpload}
            >
              <div>
              <InboxOutlined />
            </div>
          </Upload>
          <label>Notes</label>
           <Input
            value={editingStudent?.notes}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, notes: e.target.value };
              });
            }}
          />



        </Modal>

        <Modal
        title="Add a new contributor manually"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
       <label>Name</label> <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
       <label>Email</label> <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
       <label>Submitted</label> <Select
          defaultValue="Yes"
          style={{ width: 120 }}
          onChange={(value) => setSubmitted(value)}
          allowClear
          options={[
            {
              value: 'yes',
              label: 'Yes',
            },
            {
              value: 'no',
              label: 'No',
            }
          ]}
        />
        <label>Submission</label> <TextArea type='textarea' rows={10} maxLength={650} placeholder="Submission" value={submission} onChange={(e) => setSubmission(e.target.value)}/>
        <label>Picture Upload</label>
           <Upload
              name="avatar"
              listType="picture"
              className="avatar-uploader"
              showUploadList={false}
              action='api/upload' // POST request to this api endpoint for picture
              onChange={handleChangeUpload}
            >
              <div>
              <InboxOutlined />
            </div>
          </Upload>
       <label>Notes</label> <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
      </Modal>
      </header>
    </div>

    <form className="space-y-6" action="#" method="POST">

    <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Upload</h3> */}
          <p className="mt-1 text-lg text-gray-500">
            Click to upload your CSV file with your contributors' information here:
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
          <div>
         
  <Button
    onClick={handleDownloadCSV}
    onMouseEnter={handleHoverOn}
    onMouseLeave={handleHoverOff}
  >
    Download CSV template
  </Button>

  {hover && <div><em>Note: after you downloading the template and fill it in, make sure to save the file as a csv file before you upload it here!</em></div>}
  
</div>
         
      </div>
    </div>
    <Button onClick={addtoList}>Add to above list</Button>

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
