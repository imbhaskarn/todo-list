import axios from "axios";

const ApiRes = (type, data) => {
  const apiUrl = "http://localhost:8080";

  return axios[type](
    apiUrl,
    { headers: { "Content-Type": "application/json" } },
    data
  );
};
