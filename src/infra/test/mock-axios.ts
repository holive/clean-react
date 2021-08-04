import faker from 'faker'
import axios from 'axios'

export const mockHttpResponse = (): any => ({
  data: faker.random.objectElement(),
  status: faker.random.number()
})

export const mockAxios = (): jest.Mocked<typeof axios> => {
  const mockedAxios = axios as jest.Mocked<typeof axios>

  mockedAxios.post.mockResolvedValue({
    data: faker.random.objectElement(),
    status: faker.datatype.number()
  })

  mockedAxios.get.mockResolvedValue(mockHttpResponse())

  return mockedAxios
}
