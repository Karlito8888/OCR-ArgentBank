// const axios = require("axios");
// const signupApi = "http://localhost:3001/api/v1/user/signup";

// const users = [
//   {
//     firstName: "Tony",
//     lastName: "Stark",
//     email: "tony@stark.com",
//     password: "password123",
//     userName: "Iron",
//   },
//   {
//     firstName: "Steve",
//     lastName: "Rogers",
//     email: "steve@rogers.com",
//     password: "password456",
//     userName: "Captain",
//   },
// ];

// users.forEach((user) => {
//   axios
//     .post(signupApi, user)
//     .then((response) => console.log(response))
//     .catch((error) => console.log(error));
// });
const axios = require("axios");
const signupApi = "http://localhost:3001/api/v1/user/signup";

const users = [
  {
    firstName: "Tony",
    lastName: "Stark",
    email: "tony@stark.com",
    password: "password123",
    userName: "Iron",
  },
  {
    firstName: "Steve",
    lastName: "Rogers",
    email: "steve@rogers.com",
    password: "password456",
    userName: "Captain",
  },
];

const registerUsers = async () => {
  for (const user of users) {
    try {
      const response = await axios.post(signupApi, user);
      console.log(`User ${user.userName} created successfully:`, response.data);
    } catch (error) {
      if (error.response) {
        console.error(`Error for user ${user.userName}:`, error.response.data);
      } else if (error.request) {
        console.error(`No response received for user ${user.userName}`);
      } else {
        console.error(
          `Error setting up request for user ${user.userName}:`,
          error.message
        );
      }
    }
  }
};

registerUsers();
