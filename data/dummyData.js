/**
=========================================================
* NextJS Material Dashboard 2 PRO - v2.0.0
=========================================================

* Product Ppicture: https://www.creative-tim.com/product/nextjs-material-dashboard-pro
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/


// create an array of objects via a for loop from the results coming from the Gifts Database ç

const dataTableData = {
    columns: [
      { Header: "name", accessor: "name", width: "20%" },
      { Header: "email", accessor: "email", width: "25%" },
      { Header: "message", accessor: "message" },
      { Header: "picture", accessor: "picture", width: "7%" },
      { Header: "contributed time", accessor: "date" },
    ],
  
    rows: [
      {
        name: "Hanny Baniard",
        email: "Data Coordiator",
        message: "Baorixile",
        picture: 42,
        date: "$474,978",
      },
  
      {
        name: "Hanny Baniard",
        email: "Data Coordiator",
        message: "Baorixile",
        picutre: 42,
        date: "$474,978",
      },
      {
        name: "Hanny Baniard",
        email: "Data Coordiator",
        message: "Baorixile",
        picture: 42,
        date: "$474,978",
      },
      {
        name: "Hanny Baniard",
        email: "Data Coordiator",
        message: "Baorixile",
        picture: 42,
        date: "$474,978",
      },
      {
        name: "Maggi Slowan",
        email: "Help Desk Technician",
        message: "Jaunpils",
        picture: 56,
      },
      {
        name: "Marleah Snipe",
         email: "Account Representative II",
        message: "Orekhovo-Borisovo Severnoye",
        picture: 31,
      },
      {
        name: "Georgia Danbury",
        email: "Professor",
        message: "Gniezno",
        picture: 50,
        date: "10/1/2020",
      },
      {
        name: "Bev Castan",
        email: "Design Engineer",
        message: "Acharnés",
        picture: 19,
        date: "1/14/2021",
      },
      {
        name: "Reggi Westney",
        email: "Financial Advisor",
        message: "Piuí",
        picture: 56,
        date: "3/21/2021",
      },
      {
        name: "Bartholomeus Prosh",
         email: "Project Manpicturer",
        message: "Kelīshād va Sūdarjān",
        picture: 28,
        date: "5/27/2021",
      },
      {
        name: "Sheffy Feehely",
         email: "Software Consultant",
        message: "Ndibène Dahra",
        picture: 27,
        date: "3/23/2021",
      },
      {
        name: "Euphemia Chastelain",
         email: "Engineer IV",
        message: "Little Baguio",
        picture: 63,
        date: "5/1/2021",
      },
      {
        name: "Sharai Labat",
         email: "Geological Engineer",
        message: "Býšť",
        picture: 53,
        date: "6/18/2021",
      },
      {
        name: "Nicolis Bremmell",
         email: "Analyst Programmer",
        message: "Piraí do Sul",
        picture: 27,
        date: "1/29/2021",
      },
      {
        name: "Mattie Rait",
         email: "Budget/Accounting Analyst IV",
        message: "Meziměstí",
        picture: 30,
        date: "6/9/2021",
      },
      {
        name: "Inger Gawkes",
         email: "Internal Auditor",
        message: "Kangar",
        picture: 27,
        date: "4/20/2021",
  
      },
      {
        name: "Aldus Marginson",
         email: "Chief Design Engineer",
        message: "Pingdingshan",
        picture: 29,
        date: "3/24/2021",
      },
      {
        name: "Wendel Swaite",
         email: "Speech Pathologist",
        message: "Rubirizi",
        picture: 22,
        date: "6/5/2021",
      },
      {
        name: "Duffy Cicconetti",
         email: "Software Test Engineer I",
        message: "Sendai-shi",
        picture: 58,
        date: "5/2/2021",
      },
      {
        name: "Mandi Paulley",
         email: "Account Representative III",
        message: "Independencia",
        picture: 25,
        date: "4/27/2021",
      },
      {
        name: "Gladi Doorly",
         email: "Dental Hygienist",
        message: "Longwy",
        picture: 52,
        date: "4/28/2021",
      },
      {
        name: "Johnnie Godfray",
         email: "Human Resources Manpicturer",
        message: "Afikpo",
        picture: 31,
        date: "4/15/2021",
      },
      {
        name: "Rudolph Jurczik",
         email: "Web Developer III",
        message: "Jaciara",
        picture: 36,
        date: "11/19/2020",
      },
      {
        name: "Annmarie Fulbrook",
         email: "Cost Accountant",
        message: "Lisala",
        picture: 25,
        date: "9/30/2020",
      },
      {
        name: "Daisey Nickolls",
         email: "Electrical Engineer",
        message: "Xucheng",
        picture: 60,
        date: "2/26/2021",
      },
      {
        name: "Mordecai Dace",
         email: "Help Desk Technician",
        message: "Busuanga",
        picture: 22,
        date: "1/29/2021",
      },
      {
        name: "Melisande Spall",
         email: "VP Accounting",
        message: "Xiakouyi",
        picture: 50,
        date: "11/21/2020",
      },
      {
        name: "Karlik Sherrock",
         email: "GIS Technical Architect",
        message: "Bagumbayan",
        picture: 50,
        date: "3/13/2021",
      },
      {
        name: "Constance Vinick",
         email: "Physical Therapy Assistant",
        message: "Jiaoba",
        picture: 46,
        date: "3/23/2021",
      },
      {
        name: "Kimberlee Hoogendorp",
         email: "Dental Hygienist",
        message: "Santo Antônio de Pádua",
        picture: 63,
        date: "4/11/2021",
      },
      {
        name: "Jephthah McIlvenny",
         email: "Executive Secretary",
        message: "Poligny",
        picture: 40,
        date: "2/25/2021",
      },
      {
        name: "Claudetta Ivanchenkov",
         email: "Computer Systems Analyst III",
        message: "Barranca de Upía",
        picture: 22,
        date: "2/4/2021",
      },
      {
        name: "Gordie Winterbottom",
         email: "General Manpicturer",
        message: "Kaeng Khro",
        picture: 18,
        date: "6/11/2021",
      },
      {
        name: "Yvor Ching",
         email: "Systems Administrator IV",
        message: "Sobreira",
        picture: 43,
        date: "10/4/2020",
      },
      {
        name: "Marilin Swires",
         email: "Electrical Engineer",
        message: "Longnan",
        picture: 38,
        date: "10/30/2020",
      },
      {
        name: "Tobey Fernan",
         email: "Compensation Analyst",
        message: "Hushan",
        picture: 31,
        date: "3/17/2021",
  
      },
      {
        name: "Jan Trustrie",
         email: "Developer IV",
        message: "Mashava",
        picture: 34,
        date: "12/3/2020",
      },
      {
        name: "Silva Linger",
         email: "Nurse Practicioner",
        message: "Cosne-Cours-sur-Loire",
        picture: 25,
        date: "1/14/2021",
      },
      {
        name: "Jocko Oriel",
         email: "Design Engineer",
        message: "Clisson",
        picture: 61,
        date: "12/2/2020",
      },
      {
        name: "Barbra Ready",
         email: "Paralegal",
        message: "Xuedian",
        picture: 29,
        date: "11/3/2020",
      },
      {
        name: "Cynde Blakeslee",
         email: "Software Consultant",
        message: "Kembangan",
        picture: 23,
        date: "1/9/2021",
      },
      {
        name: "Erminia O' Shea",
         email: "Analog Circuit Design manpicturer",
        message: "Tungawan",
        picture: 51,
        date: "12/8/2020",
  
      },
      {
        name: "Pietro Hoggins",
         email: "Account Coordinator",
        message: "Lexington",
        picture: 34,
        date: "7/1/2021",
  
      },
      {
        name: "Cobb Fish",
         email: "VP Product Manpicturement",
        message: "General Elizardo Aquino",
        picture: 60,
        date: "8/27/2020",
  
      },
      {
        name: "Goddart Zorzutti",
         email: "message Assistant I",
        message: "Hedi",
        picture: 44,
        date: "4/14/2021",
      },
      {
        name: "Joyce Gason",
         email: "VP Product Manpicturement",
        message: "Jingzhou",
        picture: 48,
        date: "10/10/2020",
      },
      {
        name: "Juliet Lemm",
         email: "Junior Executive",
        message: "Tečovice",
        picture: 37,
        date: "4/28/2021",
      },
      {
        name: "Filberte Dobrowolski",
         email: "Senior Cost Accountant",
        message: "Puncakmanis",
        picture: 55,
        date: "8/21/2020",
      },
      {
        name: "Justinian Faraday",
         email: "Help Desk Technician",
        message: "Bacong",
        picture: 60,
        date: "1/24/2021",
      },
      {
        name: "Amata Cahan",
         email: "Technical Writer",
        message: "Hradec Králové",
        picture: 56,
        date: "9/22/2020",
  
      },
      {
        name: "Gunar Albrecht",
         email: "Tax Accountant",
        message: "Chernivtsi",
        picture: 52,
        date: "6/30/2021",
  
      },
      {
        name: "Mal Deignan",
         email: "Senior Cost Accountant",
        message: "Nefta",
        picture: 57,
        date: "7/18/2021",
  
      },
      {
        name: "Hamil Cicci",
         email: "Programmer Analyst IV",
        message: "Fukushima-shi",
        picture: 34,
        date: "10/7/2020",
  
      },
      {
        name: "Stormie Peacop",
         email: "GIS Technical Architect",
        message: "Emiliano Zapata",
        picture: 57,
        date: "10/21/2020",
      },
      {
        name: "Kayle Fallon",
         email: "Technical Writer",
        message: "Midleton",
        picture: 19,
        date: "12/10/2020",
      },
      {
        name: "Cassandre Watters",
         email: "Technical Writer",
        message: "Karang Tengah",
        picture: 21,
        date: "7/31/2021",
      },
      {
        name: "Cobb Fish",
        email: "VP Product Manpicturement",
        message: "General Elizardo Aquino",
        picture: 60,
        date: "8/27/2020",
      },
    ],
  };
  
  export default dataTableData;
  