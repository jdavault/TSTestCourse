import { DataBase } from "../../../app/server_app/data/DataBase"
import * as IdGenerator from "../../../app/server_app/data/IdGenerator"

type SomeTypeWithId = {
  id: string,
  name: string,
  color: string
}

describe("Database test suite", () => {

  let sut: DataBase<SomeTypeWithId>;
  const fakeId = "e28b4179530d32fa34m3"

  const user1 = {
    id: '',
    name: "Joe Davault",
    color: "green"
  }
  const user2 = {
    id: '',
    name: "John Davault",
    color: "green"
  }


  beforeEach(() => {
    sut = new DataBase<SomeTypeWithId>()
    jest.spyOn(IdGenerator, 'generateRandomId').mockReturnValue(fakeId)
  })

  it("Should return id after insert", async () => {
    const actual = await sut.insert(user1)
    expect(actual).toBe(fakeId)
  })

  it("Should get element after insert", async () => {
    const id = await sut.insert(user1)
    const actual = await sut.getBy("id", id)
    expect(actual).toBe(user1)
  })

  it("Should find all elements with the same prop/value", async () => {
    await sut.insert(user1)
    await sut.insert(user2)
    const expected = [user1, user2]
    const actual = await sut.findAllBy("color", "green")
    expect(actual).toEqual(expected)
  })

  it("Should change color of an object", async () => {
    const id = await sut.insert(user1)
    const expectedColor = "red"
    await sut.update(id, "color", expectedColor)
    const object = await sut.getBy("id", id)
    const actualColor = object.color
    expect(actualColor).toBe(expectedColor)
  })

  it("Should delete an object", async () => {
    const id = await sut.insert(user1)
    await sut.delete(id)
    const actual = await sut.getBy("id", id)
    expect(actual).toBeUndefined()
  })

  it("Should get all elements", async () => {
    await sut.insert(user1)
    await sut.insert(user2)
    const expected = [user1, user2]
    const actual = await sut.getAllElements()
    expect(actual).toEqual(expected)
  })

})