import * as generated from "../../app/server_app/data/IdGenerator"
import { Account } from "../../app/server_app/model/AuthModel";
import { Reservation } from "../../app/server_app/model/ReservationModel";
import { HTTP_CODES, HTTP_METHODS } from "../../app/server_app/model/ServerModel";
import { Server } from "../../app/server_app/server/Server"
import { makeAwesomeRequest } from "./utils/http-client";

describe('Server app integration tests', () => {

  let server: Server;

  beforeAll(() => {
    server = new Server();
    server.startServer();
  });

  afterAll(() => {
    server.stopServer()
  })

  const someUser: Account = {
    id: '',
    userName: 'someUserName',
    password: 'somePassword'
  }

  const someReservation: Reservation = {
    id: '',
    endDate: 'someEndDate',
    startDate: 'someStartDate',
    room: 'someRoom',
    user: 'someUser'
  }

  const someReservation2: Reservation = {
    id: '',
    endDate: 'someEndDate2',
    startDate: 'someStartDate2',
    room: 'someRoom2',
    user: 'someUser2'
  }

  const someReservation3: Reservation = {
    id: '',
    endDate: 'someEndDate3',
    startDate: 'someStartDate3',
    room: 'someRoom3',
    user: 'someUser3'
  }

  it('should register new user', async () => {
    const result = await fetch('http://localhost:8080/register', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser),
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.userId).toBeDefined();
    console.log(`connecting to address ${process.env.HOST}:${process.env.PORT}`)
  });

  it('should register new user with awesomeRequest', async () => {
    const result = await makeAwesomeRequest({
      host: 'localhost',
      port: 8080,
      method: HTTP_METHODS.POST,
      path: '/register'
    }, someUser)

    expect(result.statusCode).toBe(HTTP_CODES.CREATED);
    expect(result.body.userId).toBeDefined();
  });

  let token: string;
  it('should login new user', async () => {
    const result = await fetch('http://localhost:8080/login', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someUser)
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    expect(resultBody.token).toBeDefined();
    token = resultBody.token;

  });

  let createdReservationId: string;
  it('should create reservation if authorized', async () => {
    const result = await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token
      },
    });
    const resultBody = await result.json();

    expect(result.status).toBe(HTTP_CODES.CREATED);
    createdReservationId = resultBody.reservationId
    expect(createdReservationId).toBeDefined();
  });

  it('should get reservation if authorized', async () => {
    const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      },
    });
    const resultBody = await result.json();

    const expectedReservation = structuredClone(someReservation)
    expectedReservation.id = createdReservationId

    expect(result.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toEqual(expectedReservation);
    //expect(resultBody.id).toBe(expectedReservation.id);

  });

  it('should create and retrieve multiple reservations, if authorized', async () => {
    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation),
      headers: {
        authorization: token
      },
    });

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation2),
      headers: {
        authorization: token
      },
    });

    await fetch('http://localhost:8080/reservation', {
      method: HTTP_METHODS.POST,
      body: JSON.stringify(someReservation3),
      headers: {
        authorization: token
      },
    });

    const getAllResults = await fetch(`http://localhost:8080/reservation/all`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      },
    });

    const resultBody = await getAllResults.json();
    expect(getAllResults.status).toBe(HTTP_CODES.OK);
    expect(resultBody).toHaveLength(4)

  });

  it('should update reservation if authorized', async () => {
    const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.PUT,
      body: JSON.stringify({
        startDate: 'otherStartDate'
      }),
      headers: {
        authorization: token
      },
    });

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      },
    });
    const getRequestBody: Reservation = await result.json();
    expect(getRequestBody.startDate).toBe('otherStartDate')

  });


  it('should delete reservation if authorized', async () => {
    const updateResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.DELETE,
      headers: {
        authorization: token
      },
    });

    expect(updateResult.status).toBe(HTTP_CODES.OK);

    const result = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
      method: HTTP_METHODS.GET,
      headers: {
        authorization: token
      },
    });
    expect(result.status).toBe(HTTP_CODES.NOT_fOUND)
  });

  // it('snapshot demo', async () => {

  //   jest.spyOn(generated, 'generateRandomId').mockReturnValueOnce('1234')

  //   await fetch('http://localhost:8080/reservation', {
  //     method: HTTP_METHODS.POST,
  //     body: JSON.stringify(someReservation),
  //     headers: {
  //       authorization: token
  //     },
  //   });

  //   const getResult = await fetch(`http://localhost:8080/reservation/${createdReservationId}`, {
  //     method: HTTP_METHODS.GET,
  //     headers: {
  //       authorization: token
  //     },
  //   });
  //   const getRequestBody: Reservation = await getResult.json()
  //   expect(getRequestBody).toMatchSnapshot()
  // })

})