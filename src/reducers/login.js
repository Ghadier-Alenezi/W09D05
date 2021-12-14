// first thing is set an initial state in the reducer file,
// this state need to be an object that store the data we need it to be global so we can use it in any component
const initialState = {
  token: null,
  userId: null,
  userEmail: null,
  userName: null,
  userAvatar: null
};
// second we need to write a reducer function that take 2 argument: initialState, action
const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;
  // after google it..
  //payload: is the actual information or message in transmitted data, as opposed to automatically generated metadata.
  switch (type) {
    case "LOGIN":
      const { token, userId, userEmail, userName , userAvatar} = payload;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", userEmail); 
      localStorage.setItem("userAvatar", userAvatar); //what we need to do
      //what we need to do
      // console.log(`token ${token}, userId ${userId}`);
      return { token }; // this is the change we need to return when this case is called

    case "LOGOUT":
      localStorage.clear();
      return { token: null, userId: null, userEmail: null, userName: null, userAvatar: null };

    default:
      const tokenStorage = localStorage.getItem("token");
      const userIdStorage = localStorage.getItem("userId");
      const userEmailStorage = localStorage.getItem("userEmail");
      const userNamelStorage = localStorage.getItem("userName");
      const userAvatarlStorage = localStorage.getItem("userAvatar");

      if (tokenStorage)
        return {
          token: tokenStorage,
          userId: userIdStorage,
          userEmail: userEmailStorage,
          userName: userNamelStorage,
          userAvatar: userAvatarlStorage
        };
      else return state; //default = initial state
  }
};
export default logInReducer; // export default so we can use it anywhere we need

// after that we need to define a function to each case that take data as an argument
// this function return action = {type: case, payload: data}
export const login = (data) => {
  return {
    type: "LOGIN",
    payload: data,
  };
};

export const logout = (data) => {
  return {
    type: "LOGOUT",
    payload: data,
  };
};
