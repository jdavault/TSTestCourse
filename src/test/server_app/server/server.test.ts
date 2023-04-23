import { Server } from "../../../../src/app/server_app/server/Server"
import { Authorizer } from "../../../app/server_app/auth/Authorizer"
import { ReservationsDataAccess } from "../../../app/server_app/data/ReservationsDataAccess"
import { RegisterHandler } from "../../../app/server_app/handlers/RegisterHandler"
import { LoginHandler } from "../../../app/server_app/handlers/LoginHandler"
import { ReservationsHandler } from "../../../app/server_app/handlers/ReservationsHandler"
import { HTTP_CODES } from "../../../app/server_app/model/ServerModel"

jest.mock('../../../app/server_app/auth/Authorizer')
jest.mock('../../../app/server_app/data/ReservationsDataAccess')
jest.mock('../../../app/server_app/handlers/RegisterHandler')
jest.mock('../../../app/server_app/handlers/LoginHandler')
jest.mock('../../../app/server_app/handlers/ReservationsHandler')

const requestMock = {
  url: '',
  headers: {
    'user-agent': 'jest-test'
  }
}

const responseMock = {
  end: jest.fn(),
  writeHead: jest.fn()
}

const serverMock = {
  listen: jest.fn(),
  close: jest.fn()
}

jest.mock('http', () => ({
  createServer: (cb: Function) => {
    cb(requestMock, responseMock)
    return serverMock
  }
}))

describe('Server test suite', () => {

  let sut: Server;

  beforeEach(() => {
    sut = new Server()
    expect(Authorizer).toBeCalledTimes(1)
    expect(ReservationsDataAccess).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should start server on port 8080 and end the request', async () => {
    await sut.startServer()
    expect(serverMock.listen).toBeCalledWith(8080)
    console.log('checking response.end calls')
    expect(responseMock.end).toBeCalled()
  })

  it('should handle register requests', async () => {
    requestMock.url = 'localhost:8080/register';
    const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest')
    await sut.startServer();

    expect(handleRequestSpy).toBeCalledTimes(1)
    expect(RegisterHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer))
  })


  it('should handle login requests', async () => {
    requestMock.url = 'localhost:8080/login';
    const handleRequestSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest')
    await sut.startServer();

    expect(handleRequestSpy).toBeCalledTimes(1)
    expect(LoginHandler).toBeCalledWith(requestMock, responseMock, expect.any(Authorizer))
  })

  it('should handle reservation requests', async () => {
    requestMock.url = 'localhost:8080/reservation';
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')
    await sut.startServer();

    expect(handleRequestSpy).toBeCalledTimes(1)
    expect(ReservationsHandler).toBeCalledWith(requestMock,
      responseMock,
      expect.any(Authorizer),
      expect.any(ReservationsDataAccess)
    )
  })


  it('should do nothing for non-supported routes', async () => {
    requestMock.url = 'localhost:8080/someRandomRoute';
    const validateTokenSpy = jest.spyOn(Authorizer.prototype, 'validateToken')
    await sut.startServer();

    expect(validateTokenSpy).not.toBeCalled()

  })

  it('should handle errors in servicing requests', async () => {
    requestMock.url = 'localhost:8080/reservation';
    const handleRequestSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')
    handleRequestSpy.mockRejectedValueOnce(
      new Error('Some error')
    )
    await sut.startServer();
    expect(responseMock.writeHead).toBeCalledWith(
      HTTP_CODES.INTERNAL_SERVER_ERROR,
      JSON.stringify("Internal server error: Some error")
    )
  })

  it('should stop the server if its running', async () => {
    await sut.startServer();

    await sut.stopServer();

    expect(serverMock.close).toBeCalledTimes(1)
  })

})
