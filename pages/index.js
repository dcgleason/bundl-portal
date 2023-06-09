import {Modal, List, Typography, Button, Table, Input, Select, Upload, message, notification, Form, Row, Col, Space, Spin} from 'antd';
import { use, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { EditOutlined, DeleteOutlined, InboxOutlined  } from "@ant-design/icons";
import Papa from 'papaparse';
import React, { useState, useEffect, Fragment } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'js-cookie';
import moment from 'moment';

const { Option } = Select;

const { TextArea } = Input;


const CSV = () => {


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [newStudent, setNewStudent] = useState(null);
  const [pictureSubmitted, setPictureSubmitted ] = useState(false);
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [hover, setHover] = useState(false);
  const [userID, setUserID] = useState(null);
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [emailBody, setEmailBody] = useState('');
  const [emailSubject, setEmailSubject] = useState("Contribute please - 3 days left!");
  const [emailRecipients, setEmailRecipients] = useState([]);
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
  const [lastEmailSent, setLastEmailSent] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const cancelButtonRef = useRef(null)
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null);
  const [viewPicture, setViewPicture] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isPromptModalVisible, setIsPromptModalVisible] = useState(false);
  const [prompts, setPrompts] = useState([
    "How has Jimmy affected your life?",
    "What do you love about Jimmy?",
    "What's your favorite memory with Jimmy?",
    "How has Jimmy inspired you?",
    "What do you wish for Jimmy's future?"
  ]);
  const [longMessage, setLongMessage] = useState('');
  const [token, setToken] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [recipientFirstName, setRecipientFirstName] = useState("");
  const [recipientlastName, setRecipientLastName] = useState("");
  const [userData, setUserData] = useState(null);

  



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
      title: "SMS",
      dataIndex: "sms",
    },
    {
      key: "5",
      title: "Submitted",
      dataIndex: "submitted",
      render: (_, record) => {
        return record.submitted == "Yes" ? "Yes" : "No";
      },
    },
    {
      key: "6",
      title: "Submission",
      dataIndex: "submission",
      render: (_, record) => { 
        return (
          <>
          {record.submission && record.submission !== "No submission" ?
          <a className="underline" onClick={ () => handleModalOpen(record)}>Preview Submission</a>
          :
          "No Submission"
          }
          </>
        )
      }
    },   
    {
      key: "7",
      title: "Picture",
      dataIndex: "picture",
      render: (_,record) => { 
        return (
          <>
          {record.img_file && record.img_file !== "" ?
          <a className="underline" onClick={ () => handleViewPicture(record)}>View Picture</a>
          :
          "No Picture Uploaded"
          }
          </>
        )
      }
    },
    {
      key: "8",
      title: "Notes",
      dataIndex: "notes",
    },
    {
      key: "9",
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

    const token = localStorage.getItem('token');
    const userID = jwt_decode(token).userId;


    const fetchUser = async () => {
      const response = await fetch(`https://yay-api.herokuapp.com/users/${userID}`);
      const data = await response.json();

      if (data) {
        setUserData(data);
        console.log('User data inside fetch user: ', data);
        if (data.recipient === "") {
          console.log('Recipient is empty');
          setRecipientModalIsOpen(true);
        }
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
  
    if (!token) {
      console.error('Token is not available in local storage');
      signInWithGoogle(); // Redirect to Google's authorization URL
      return;
    }
  
    setEmailBody(`We'd love you to contribute to this bundle -- link here: <a href="https://www.givebundl.com/contribute/${jwt_decode(token).userId}">Link to Contribution Page</a>`)

    // Decode the JWT token to get the user's ID
    const decodedToken = jwt_decode(token);
    const userID = decodedToken.userId; // Changed from 'userID' to 'userId'
    const fetchUser = async () => {
      const response = await fetch(`https://yay-api.herokuapp.com/users/${userID}`);
      const user = await response.json();
      if (user.lastEmailed) {
        let localEmailDate = localStorage.getItem('lastEmailSent');
        let emailDate = moment(user.lastEmailed);
        if (localEmailDate && moment(localEmailDate).isAfter(emailDate)) {
          emailDate = moment(localEmailDate);
        }
        setLastEmailSent(emailDate.format('MMMM Do, YYYY @ h:mm A'));
        console.log("lastEmailSent", emailDate.format());
      }
      console.log("user", user);
      console.log("lastEmailSent", user.lastEmailed);
    };
  if(userID){
    fetchUser();
  }
  }, [lastEmailSent]);


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
            id: index + 1, // This is the index in the table
            uuid: key, // This is the UUID of the message
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

  function onSendSMS(time, recipient, gifter, to) {
    const url = 'https://yay-api.herokuapp.com/sms/sendSMS';
    const data = {
      time: time,
      recipient: recipient,
      gifter: gifter,
      to: to
    };
  
    fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
      console.error('Error:', error);
    });
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
    if (!data || !data.submission) {
      return "No submission available";
    }
  
    return (
      <div>
        <p>{data.submission}</p>
      </div>
    );
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
  
    const firstValue = dataSource.length > 0 ? dataSource[dataSource.length - 1].id : 0;
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
            layout_id: 1, // Or whatever layout_id you want to use
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
  
      const data = await Promise.all(responses.map(response => response.json()));
  
      data.forEach((item, index) => {
        if (!item.success) { // Check if the server actually saved the new contributor
          throw new Error(`Server failed to save contact ${objects[index].name}`);
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

  const handlePromptOk = async () => {
    const token = localStorage.getItem('token');
    const userID = jwt_decode(token).userId;
    const url = `https://yay-api.herokuapp.com/users/${userID}/prompts`;
  
    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompts, longMessage }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log('Prompts updated on the server successfully');
      setIsPromptModalVisible(false);
    } catch (error) {
      console.error('Failed to update prompts on the server:', error);
    }
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


  const handleSendEmail = async () => {
    setIsSendingEmail(true);
    console.log('email sent')
    let token = localStorage.getItem('token');
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
      const userID = decoded.userId;
  
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Use the new token
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
      setIsSendingEmail(false);
      setEmailModalVisible(false);
      setShowSuccessModal(true);
  
      // Create a new date only if lastEmailSent is null
      let newDate;
      newDate = moment().toDate();
      localStorage.setItem('lastEmailSent', newDate);
  
        // Update lastEmailed attribute in the backend
        await fetch(`https://yay-api.herokuapp.com/users/${userID}/lastEmailed`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            lastEmailed: newDate,
          }),
        });
  
        // Format the new date and update the lastEmailSent state variable
        setLastEmailSent(moment(newDate).format('MMMM Do, YYYY @ h:mm A'));
    }
  };
  


  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  
  
  const onDeleteStudent = (record) => {
    console.log('delete record.uuid = '+ record.uuid)
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: async () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
  
        // Send a DELETE request to your server to delete the student
        const response = await fetch(`https://yay-api.herokuapp.com/book/${userID}/message/${record.uuid}`, {
          method: 'DELETE',
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        console.log('Student deleted from the server successfully');
      },
    });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  const openPrompts = () => {
    setIsPromptModalVisible(true);
  };


  const handlePromptCancel = () => {
    setIsPromptModalVisible(false);
  };

  const handleRecipientOk = async () => {
    const response = await fetch(`https://yay-api.herokuapp.com/users/${userID}/recipient`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipientFullName: `${firstName} ${lastName}`,
        recipientFirstName: firstName,
      }),
    });

    if (response.ok) {
      setModalIsOpen(false);
    } else {
      console.error('Failed to update recipient');
    }
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
      formData.append('email', newStudent.email || 'none');
  
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
         {userData !== null && <h1 style={{ marginBottom: '20px', textAlign: 'center' }} className="text-3xl font-bold">Bundl for {userData.recipient}</h1>}


        <Modal
        title="Who is this bundl for?"
        open={modalIsOpen}
        onOk={handleRecipientOk}
        onCancel={() => setModalIsOpen(false)}
      >
        <Input placeholder="First Name" onChange={e => setRecipientFirstName(e.target.value)} />
        <Input placeholder="Last Name" onChange={e => setRecipientLastName(e.target.value)} />
      </Modal>

      
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
      <Modal title="Choose Prompts and Note" open={isPromptModalVisible} onOk={handlePromptOk} onCancel={handlePromptCancel}>
      {prompts.map((prompt, index) => (
        <Input
          key={index}
          placeholder={`Prompt ${index + 1}`}
          value={prompt}
          onChange={(e) => {
            const newPrompts = [...prompts];
            newPrompts[index] = e.target.value;
            setPrompts(newPrompts);
          }}
          style={index > 0 ? { marginTop: '10px' } : {}}
        />
      ))}
       <TextArea
          placeholder="Longer message"
          value={longMessage}
          onChange={(e) => setLongMessage(e.target.value)}
          style={{ marginTop: '10px' }}
        />
    </Modal>
      <div className="App">
      <header className="App-header px-4 sm:px-6 md:px-8 mb-4">
            <Row gutter={[16, 16]} justify="center">
          <Col xs={24} sm={12} md={6} lg={4}>
            <Button onClick={openPrompts}>Write Prompts and Note</Button>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Button onClick={onAddStudent}>Add contributor manually</Button>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            {isAuthenticated ? (
              <Button onClick={openEmailModal}>Send Email</Button>
            ) : (
              <Button onClick={signInWithGoogle}>Sign in with Google</Button>
            )}
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            <Button onClick={onSendSMS}>Send SMS</Button>
          </Col>
          <Col xs={24} sm={12} md={6} lg={4}>
            {lastEmailSent && <p className='text-sm'>Last email sent: {lastEmailSent}</p>}
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
          onCancel={handleEmailModalCancel}
          footer={null} 
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
          {isSendingEmail ? (
            <Spin />
          ) : (
            <Button key="ok" type="primary" onClick={handleSendEmail}>
              Send it
            </Button>
          )}
        </Modal>
         <Modal
                title="Success"
                open={showSuccessModal}
                onCancel={() => setShowSuccessModal(false)}
                footer={null}
              >
                <p>Email has been sent.</p>
              </Modal>
              <Modal
              title="Edit Contributor"
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

                try {
                  const response = await fetch(`https://yay-api.herokuapp.com/book/${userID}/message/${editingStudent.uuid}`, {
                    method: 'PUT',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      layout_id: 1,
                      name: editingStudent.name,
                      msg: editingStudent.submission || 'None',
                      img_file: editingStudent.picture || 'None',
                      email: editingStudent.email || 'None', 
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
                  },
                ]}
              />
              <label>Submission</label>
              <TextArea
                rows={10}
                type="textarea"
                maxLength={3500}
                value={editingStudent?.submission}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, submission: e.target.value };
                  });
                }}
              />
            
              <label>Notes</label>
              <Input
                value={editingStudent?.notes}
                onChange={(e) => {
                  setEditingStudent((pre) => {
                    return { ...pre, notes: e.target.value };
                  });
                }}
              />

              <label>Picture Upload</label>
              <Upload
                name="avatar"
                listType="picture"
                className="avatar-uploader"
                showUploadList={false}
                action='api/upload'
                onChange={handleChangeUpload}
              >
                <div>
                  <InboxOutlined />
                </div>
              </Upload>
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
