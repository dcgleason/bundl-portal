
import {Modal, List, Typography, Button, Table, Input, Select, Upload, message, notification, Form, Row, Col, Space} from "antd";
import { use, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { EditOutlined, DeleteOutlined, InboxOutlined  } from "@ant-design/icons";
import Papa from "papaparse";
import React, { useState, useEffect, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';

const { TextArea } = Input;


// create a component that will be used as a wrapper for the GoogleAuth component



const CSV = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [newStudent, setNewStudent] = useState(null);
  const [pictureSubmitted, setPictureSubmitted ] = useState(false);
       // State to store parsed data
  const [parsedData, setParsedData] = useState([]);

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);
  const [hover, setHover] = useState(false);
  const [userID, setUserID] = useState(null);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [emailBody, setEmailBody] = useState("We'd love you to contribute to this bundle");
  const [emailSubject, setEmailSubject] = useState("Contribute please - 3 days left!");
  const [emailRecipients, setEmailRecipients] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [modalData, setModalData] = useState("");
  const [ submission, setSubmission ] = useState("");
  const [openGmail, setOpenGmail] = useState(false)
  const [ gmailContacts, setGmailContacts ] = useState([{}]);
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [layout, setLayout] = useState('');
  const [msg, setMsg] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const cancelButtonRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [viewPicture, setViewPicture] = useState(false);


  
  const [dataSource, setDataSource] = useState([]);

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
      render: (_, record) => {
        return record.submitted || (!record.msg) ? "No" : "Yes";
      },
    },
    {
      key: "5",
      title: "Submission",
      dataIndex: "submission",
      render: (record) => { 
        return (
          <>
          {record && record !== "" ?
          <a className="underline" onClick={ () => handleModalOpen(record)}>Preview Submission</a>
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
          {record && record !== "" ?
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


  useEffect(() => {
    const auth = Cookies.get('auth'); // Get the authentication tokens from the cookie
    console.log("auth", auth);
    // If the authentication tokens are present, set isAuthenticated to true
    if (auth) {
      setIsAuthenticated(true);
      console.log('Authentication tokens are available in the cookie')
    } else {
      setIsAuthenticated(false);
      console.log('Authentication tokens are not available in the cookie')
    }
  }, [isAuthenticated]);

  console.log("isAuthenticated", isAuthenticated);


  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error('Token is not available in local storage');
      signInWithGoogle(); // Redirect to Google's authorization URL
      return;
    }
  
    // Decode the JWT token to get the user's ID
    const decodedToken = jwt_decode(token);
    const userID = decodedToken.userId; // Changed from 'userID' to 'userId'
    if (!userID) {
      console.error('User ID is not available in the decoded JWT token');
      return;
    }
  
    setUserID(userID);
  
    // Fetch the book messages using the user's ID
    fetch(`https://yay-api.herokuapp.com/book/${userID}/messages`, {
      credentials: 'include',
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Check if data.messages is an object before proceeding
      if (data && typeof data.messages === 'object') {
        const transformedData = Object.entries(data.messages).map(([key, value], index) => {
            return {
              id: index + 1,
              name: value.name || "Name not available",
              email: value.email || "No email given",
              submitted: value.msg ? "Yes" : "No",
              notes: '', // Not sure where this data comes from
              submission: value.msg || "No submission",
              picture: !!value.img_file, // Convert to boolean; true if exists, false otherwise
            };
          });
  
          setDataSource(transformedData);
          console.log('Transformed data:', transformedData);
        } else {
          console.log('Data is not in the expected format');
        }
      })
      .catch(error => {
        console.error('Failed to fetch:', error);
      });
  }, []);
  
  
  function signInWithGoogle() {
    const clientId = '764289968872-3rstr2akvdot7cfjk9ektjeaghe2pghr.apps.googleusercontent.com';
    const redirectUri = 'https://www.console.givebundl.com/api/oauth2callback'; // Update this to your actual server address
    const scope = 'https://www.googleapis.com/auth/gmail.send';
    const responseType = 'code';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=${responseType}`;
    window.location.href = url;
  }

  const openEmailModal = () => {
    // Get the emails of people who have not yet contributed
    const nonContributors = dataSource.filter(student => student.submitted === "No").map(student => student.email);
    setEmailRecipients(nonContributors.join(', '));
    console.log('Non-contributors:', nonContributors);
    setEmailModalVisible(true);
  };
  
  // const handleEmailModalOk = async () => {
  //   // Here you would handle sending the email
  //   console.log(emailBody, emailSubject, emailRecipients);
  
  //   // Prepare the data to send
  //   const emailData = {
  //     body: emailBody,
  //     subject: emailSubject,
  //     recipients: emailRecipients.split(', '), // Assuming recipients are separated by a comma and a space
  //   };
  
  //   try {
  //     // Send a POST request to your backend
  //     const response = await fetch('https://yay-api.herokuapp.com/email/send', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${session.accessToken}`,
  //       },
  //       body: JSON.stringify({
  //         subject: 'Contribute please - 3 days left!',
  //         body: 'We would love you to contribute to this bundle',
  //         recipients: emailRecipients.split(', ')
  //       }),
  //     })
  //     .then(response => response.json())
  //     .then(data => console.log(data))
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
  
  //     // Check if the request was successful
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     console.log('Email sent successfully');
  //   } catch (error) {
  //     console.error('Failed to send email:', error);
  //   }
  
  //   setEmailModalVisible(false);
  // };
 
  
  const handleEmailModalCancel = () => {
    setEmailModalVisible(false);
  };
  

  const closeModal = () => {
    setOpenGmail(false);
  };


  
    // const contactsResponse = await fetch('https://yay-api.herokuapp.com/email/contacts', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${accessToken}`,
    //   },
    // });
  
    // const contacts = await contactsResponse.json();
    // setContacts(contacts);
    // setShowModal(true);

  const handleClose = () => {
    setShowModal(false);
  };

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


  const handleViewPicture = (record) => {
    setPictureUrl(record.img_file);
    setViewPicture(true)
  };
  
  const handleClosePictureModal = () => {
    setPictureUrl(null);
    setViewPicture(false);
  };
  
  
  const addtoList = async () => {
    let objects = [];
    console.log('values', values)

  
    const firstValue = dataSource[dataSource.length - 1].id;
    console.log('firstValue', firstValue);
    for (let i = 0; i < values.length; i ++) {
      objects.push({
        id: firstValue + 1 + i,
        name: values[i][1],
        email: values[i][2],
        address: values[i][3],
        submitted: false,
        submission: '',
        picture: '',
      });
    }
  
    // Add the new contacts to the dataSource state
    setDataSource([...dataSource, ...objects]);
  
    // Now, send the new contacts to the server
  
    try {
     
      const promises = objects.map((contact) => {
        return fetch(`https://yay-api.herokuapp.com/book/${userID}/message`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            layout_id: 1, // Or whatever layout_id you want to use // need a way to figure out the layout ---> on the backend I think
            name: contact.name,
            msg: contact.submission,
            img_file: contact.picture,
            email: contact.email,
          }),
        });
      });

      console.log('promises', promises);
  
      const responses = await Promise.all(promises);
  
      responses.forEach((response, index) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} for contact ${objects[index].name}`);
        }
      });
  
      console.log('Contacts added to the server successfully');
    } catch (error) {
      console.error('Failed to add contacts to the server:', error);
    }
  };
  
  

  const changeHandler = (event) => {
    // Passing file data (event.target.files[0]) to parse using Papa.parse
    console.log('event.target.files[0]', event.target.files[0])
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
        console.log('parsedData = '+ parsedData)
      },
    });
  };

  const handleDownloadCSV = () => {
    window.open('https://docs.google.com/spreadsheets/d/1_fXj2aWK8dXI-GgjzuObLC0crXYx7HpVGTTaQZmdj7g/edit?usp=sharing', '_blank');
  }

  const handleHoverOn = () => {
    setHover(true);
  }
  
const handleHoverOff = () => {
    setHover(false);
  }
  
  const onAddStudent = () => {
    setIsModalVisible(true);
  
    const newStudent = {
      id: dataSource[dataSource.length - 1].id + 1,
      name: name,
      email: email,
      layout: layout? layout : 1,
      msg: msg,
    };
  
    // Make a POST request to your API endpoint
    fetch(`https://yay-api.herokuapp.com/book/${userID}/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newStudent),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Update the local state only after the new student has been added to the database
      setDataSource((pre) => {
        return [...pre, newStudent];
      });
    })
    .catch((error) => {
      console.error('Error:', error);
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

  const handleSendEmail = async () => {
    console.log('email sent')
    const token = localStorage.getItem('token');
    if (!token) {
      // If the user is not signed in, prompt them to do so
      // You would need to implement this part based on how your sign-in system works
    } else {
      // If the user is signed in, send the email
      const recipientEmails = emailRecipients.split(',').map(email => email.trim());
  
      // Decode the JWT
      const decoded = jwt_decode(token);
  
      // Extract the sender's name and username from the decoded JWT
      const senderName = decoded.name;
      const senderEmail = decoded.username;
      const userID = userID;
  
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the token from local storage
        },
        body: JSON.stringify({
          senderName,
          senderEmail,
          emailSubject, // Use the emailSubject state variable
          emailBody, // Use the emailBody state variable
          recipientEmails,
          userID,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Email sent successfully');
    }
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

  const handleOk = async () => {
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
  
    // Add the new student to the dataSource state
    setDataSource([...dataSource, newStudent]);
  
    // Now, send the new student to the server
    try {
      const formData = new FormData();
      formData.append('layout_id', 1); // Or whatever layout_id you want to use
      formData.append('name', newStudent.name);
      formData.append('msg', newStudent.submission || 'none');
      formData.append('imageAddress', newStudent.picture || 'none'); // Assuming newStudent.picture is a File object
      formData.append('messageId', newStudent.id); // Add the messageId
  
      const response = await fetch(`https://yay-api.herokuapp.com/book/${userID}/message`, {
        method: 'POST',
        body: formData, // Send formData instead of JSON
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Student added to the server successfully');
    } catch (error) {
      console.error('Failed to add student to the server:', error);
    }
  }
  
  

  const handleCancel = () => {
    setIsModalVisible(false);
  };
// people api client secret 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
 
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
        {displaySubmission(modalData)}
      </Modal>
      
      <div className="App">
        <header className="App-header px-4 sm:px-6 md:px-8">
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24} sm={12} md={8} lg={6}>
              <Button onClick={onAddStudent}>Add a new contributor</Button>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
              {isAuthenticated ? (
                <Button onClick={openEmailModal}>Send Email</Button>
              ) : (
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              )}
            </Col>
          </Row>
          <Row gutter={[16, 16]} justify="center">
            <Col xs={24}>
              <Table columns={columns} dataSource={dataSource}></Table>
            </Col>
          </Row>
          <Modal
            title="Send Email"
            open={emailModalVisible}
            onOk={handleSendEmail}
            onCancel={handleEmailModalCancel}
          >
            <Form layout="vertical">
              <Form.Item label="To">
                <Input.TextArea value={emailRecipients} onChange={e => setEmailRecipients(e.target.value)} />
              </Form.Item>
              <Form.Item label="Subject">
                <Input value={emailSubject} onChange={e => setEmailSubject(e.target.value)} />
              </Form.Item>
              <Form.Item label="Body">
                <Input.TextArea value={emailBody} onChange={e => setEmailBody(e.target.value)} />
              </Form.Item>
            </Form>
          </Modal>
             <Modal
              title="Add a contributor"
              open={isEditing}
              okText="Save"
              onCancel={() => {
                resetEditing();
              }}
              onOk={async () => {
                setDataSource((pre) => {
                  return pre.map((student) => {
                    if (student.id === editingStudent.id) {
                      return editingStudent;
                    } else {
                      return student;
                    }
                  });
                });

                // Now, send the updated student to the server
                try {
                  const response = await fetch(`https://yay-api.herokuapp.com/book/${userID}/message/${editingStudent.id}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      layout_id: 1, // Or whatever layout_id you want to use
                      name: editingStudent.name,
                      msg: editingStudent.submission || 'none',
                      img_file: editingStudent.picture || 'none',
                      email: editingStudent.email || 'none',
                    }),
                  });

                  if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                  }

                  console.log('Student updated on the server successfully');
                } catch (error) {
                  console.error('Failed to update student on the server:', error);
                }

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
            <label>Submitted</label> 
            <Select
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
            <label>Submission</label> 
            <TextArea type='textarea' rows={10} maxLength={650} placeholder="Submission" value={submission} onChange={(e) => setSubmission(e.target.value)}/>
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
            <label>Notes</label> 
            <Input placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
          </Modal>
                <Modal
                title="View Picture"
                open={viewPicture}
                onCancel={handleClosePictureModal}
                footer={null}
              >
                <img src={pictureUrl} alt="Submission" style={{ maxWidth: '100%' }} />
              </Modal>
      </header>
    </div>



    <form className="mt-10" action="#" method="POST">
  <Row gutter={[16, 16]} justify="center">
    <Col xs={24} sm={22} md={20} lg={18} xl={16}>
      <div className="px-4 py-5 bg-white shadow sm:rounded-lg sm:p-6">
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <p className="text-lg text-gray-500">
              Click to upload your CSV file with your contributors' information here:
            </p>
          </Col>
          <Col xs={24} sm={12} md={8} className="mx-auto">
            <input
              type="file"
              name="file"
              accept=".csv"
              onChange={changeHandler}
            />
          </Col>
        </Row>
      </div>
      <Row justify="space-between" align="middle">
        <Button onClick={addtoList}>Add to above list</Button>
          <Button
            onClick={handleDownloadCSV}
            onMouseEnter={handleHoverOn}
            onMouseLeave={handleHoverOff}
          >
            Download CSV template
          </Button>
      </Row>
      <div className="mt-8">
        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {tableRows.map((rows, index) => {
                  return (
                    <th key={index}>{rows}</th>
                  )
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {values.map((value, index) => {
                return (
                  <tr key={index}>
                    {value.map((val, i) => {
                      return <td key={i} className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{val}</td>
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Col>
  </Row>
</form>
  </>

    );
}

export default CSV;
