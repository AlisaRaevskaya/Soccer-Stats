//https://cheatcode.co/tutorials/how-to-write-an-api-wrapper-using-javascript-classes-and-fetch
import axios from "axios";

class ApiFootballData {
  constructor() {
    this.apiKey = process.env.DOTENV.API_KEY,

    this.endpoints = {
      teams: {
        list: (options = {}) => {
          return {
            method: "GET",
            resource: "teams",
            body: null,
          };
        },
        matches: (options = {}) => {
          return {
            method: "GET",
            resource: `${
              options.team_id ? options.team_id : ""
            }/matches?dateFrom=${options.dateFrom}&dateTo=${options.dateTo}`,
            body: null,
          };
        },
      },
      competitions: {
        list: (options = {}) => {
          return { method: "GET", resource: "competitions", body: null };
        },
      },
    }
  }

  request(endpoint = {}) {
    let result = "";
    axios({
      method: endpoint?.method,
      url: `http://api.football-data.org/v2/${endpoint.resource}`,
      headers: { "X-Auth-Token": `${this.apiKey}` },
      body: endpoint?.body ? JSON.stringify(endpoint.body) : null,
    })
      .then((response) => {
        result =  response.data;
        console.log(response.data);
        // return response.data;
      })
      .catch((error) => {
        return error;
      });
    // .finally(() => {
    //   setIsLoaded(true);
    // });
    return result;
  }



  teams(method = "", options = {}) {
    const existingEndpoint = this.endpoints.teams[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      console.log(endpoint);

      console.log(this.request(endpoint));
      return this.request(endpoint);
    }
  }
  competitions(method = "", options = {}) {
    const existingEndpoint = this.endpoints.competitions[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      console.log(endpoint);

      console.log(this.request(endpoint));
      return this.request(endpoint);
    }
  }
}

export default new ApiFootballData();
