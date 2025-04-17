import axios from "axios"

class CallApiService {
  private apiUrl: string

  constructor() {
    this.apiUrl = "https://api.restful-api.dev/objects"
  }

  public async fetchData(): Promise<any> {
    try {
      const response = await axios.get(this.apiUrl)
      console.log("API Response:", response.data)
      return response.data // Added return statement
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data from API:", error.message)
      } else {
        console.error("Error fetching data from API:", error)
      }
      throw error // Re-throw the error for the caller to handle
    }
  }
}

export default CallApiService // Added export default
