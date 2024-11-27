const request = require("supertest");
const app = require("../app.js");

describe("POST /api/auth/login", () => {
  it("Debe retornar un token al iniciar sesión exitosamente", async () => {
    const credentials = {
      correo: "admin@admin.com",
      contrasenia: "admin",
    };

    const response = await request(app)
      .post("/api/auth/login")
      .send(credentials)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("token");
  });
});

// describe("POST /api/auth/google", () => {
//   it("Debe autenticar un usuario con Google y retornar un token", async () => {
//     const googleToken = {
//       googleToken:
//         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjM2MjgyNTg2MDExMTNlNjU3NmE0NTMzNzM2NWZlOGI4OTczZDE2NzEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2NzM5NTA2Njc4MzYtYnVmOWkzcWxmb2tlM25wZWJxMWhmMmRpbW11MHZxbWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2NzM5NTA2Njc4MzYtYnVmOWkzcWxmb2tlM25wZWJxMWhmMmRpbW11MHZxbWIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTAwNjQ5MDI4MDMyMTEwMDc0MzciLCJlbWFpbCI6ImJyeWFuYXZhbG9zc2lzdGVtYXNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTczMjY5NTEzOSwibmFtZSI6IkJyeWFuIEF2YWxvcyIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJS2N1TkFNUFYxWGduSHBBU2RfNk1uQy02RElkdVNkSVRFaTlWX2hocEt2QVRVeURRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkJyeWFuIiwiZmFtaWx5X25hbWUiOiJBdmFsb3MiLCJpYXQiOjE3MzI2OTU0MzksImV4cCI6MTczMjY5OTAzOSwianRpIjoiODIyOGUzMDI2OWQzZGU3ZTY4MzlmMzFjZjVlYTQ0ZWI4Y2E4OTk5YSJ9.qNv9RIIplSWYnktJjTf1o4GBqU3pwODz4KLXtZhgP8a9MTEuZ0X5Z5lF3y7FL9yjVk0aRMxmS93yvW0Agm3pOCinarwS23Wnq5Rrc0lmwPZfMbNK8pHxQnEBMlqdzIE4OB1Dtg23G9Ra3YUjEvWwgFqz5_2pRtVMDoRcw6lflOCfYJ8vVZE6kdBSW8y73F-hPvsLNVsil7sWaDpTwVVOlvdFn25YepejBOuaQFFeYwFyqToTuoNuZ3bR_8u3kgn2U5_wypcuBqtWQch1bjXc-dkyuHE7_WbERfmLC7_4Q2nOYraXat6R69F9eLMsGrDvavDM6NyF5-XqY2Rh5WQppQ",
//     };

//     const response = await request(app)
//       .post("/api/auth/google")
//       .send(googleToken)
//       .set("Content-Type", "application/json");

//     expect(response.status).toBe(200);
//   });
// });
