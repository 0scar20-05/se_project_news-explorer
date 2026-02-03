export const authorize = ({ name, email, password }) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    resolve({ token: "a fake token" });
  });
};

export const checkToken = (token) => {
  return new Promise((resolve, reject) => {
    resolve({
      name: "fake user",
      email: "fake@example.com",
      _id: "fake-id",
    });
  });
};
