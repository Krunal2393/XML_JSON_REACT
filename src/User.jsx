//1)LOCAL XML CALLS :-----------FETCH()

//********************************************************** */
//trying json data to fetch and het responce

import React, { useEffect, useState } from "react";

import axios from "axios";
import { parseString } from "xml2js";

export default function User() {
  const [userData, setUserdata] = useState();
  const [xmlData, setXmlData] = useState({});
  const [formData, setFormData] = useState({});

  //making state of Array for get perticular value(like name,id) from parsed json data
  const [parsedDataArray, setParseddataarray] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://127.0.0.1:8000/student', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the response data
        console.log(data);
      });
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const funA = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => setUserdata(json))
      .then((json) => console.log("jsondata", userData))
      .catch((error) => console.error(error));
  };

  const funB = async () => {
    const res = await axios.get("http://127.0.0.1:8000/student");
    console.log("XML_Typed_res ----> ", res.data);

    // parsing xml data
    parseString(res.data, function (err, results) {
      // parsing to json
      let data = JSON.stringify(results);
      console.log("JSON_typed_res---->", JSON.parse(data));

      //take stringify json data into variable ->set finaldata into blank object state
      const FinalData = JSON.parse(data);
      setXmlData(FinalData);

      //make variable ,assigned the value that we get from data

      const jsonDataArray = FinalData.root["list-item"];
      setParseddataarray(jsonDataArray);
      console.log("jsonDataArray", jsonDataArray);
    });
  };

  useEffect(() => {
    funA();
    funB();
  }, []);

  return (
    <>
    <div className="User_maindiv  bg-black ">
      <div>
        <div className="text-white">
          <p className="text-2xl text-center mb-7">XMLHTTP REQUEST-RESPONSE</p>
        </div>

        <div className="flex justify-around">
          <div className="w-80">
            <h1 className="text-white bg-gray-400 h-12">JSON Data:</h1>
            <p className="text-white"> JSON typed api data showed</p>
            {userData &&
              userData.map((user) => (
                <div className="mt-12">
                  <div
                    className="cardDiv bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
                    key={user.id}
                  >
                    <pre className="">
                      NAME:- {user.name}
                      <br />
                      USERNAME:-{user.username}
                      <br />
                      PHONE:-{user.phone}
                      <br />
                      EMAIL:-{user.email}
                      <br />
                    </pre>
                  </div>
                </div>
              ))}
          </div>

          <div className="">
            <div className="  w-80 ">
              <div>
                <h2 className="text-white bg-gray-400 h-12">XML Data:</h2>
                <p className="text-white">
                  XML Typed data converted to JSON and data showed
                </p>
                {parsedDataArray.map((item) => (
                  <div className="text-center mt-7  bg-gradient-to-r from-green-100 to-yellow-100 w-64 ">
                    <hr />
                    <table>
                      <tr>
                        <td>ID :{item.id}</td>
                      </tr>
                      <tr>
                        <td>Name :{item.name}</td>
                      </tr>
                      <tr>
                        <td>Course:{item.course}</td>
                      </tr>
                    </table>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
      <label className="bg-white">
        Name:
        <input type="text" name="name" onChange={handleChange} />
      </label>
      <label className="bg-orange-800">
        Email:
        <input type="text" name="email" className="" onChange={handleChange} />
      </label>
      <button type="submit" className="bg-green-800">Add Data</button>
    </form>

    </>

  );
  
}
//**************************************************************************************************************

//now use xml typed data ,fetch the data then call the response
//react
