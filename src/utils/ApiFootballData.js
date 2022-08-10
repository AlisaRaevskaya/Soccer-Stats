//https://cheatcode.co/tutorials/how-to-write-an-api-wrapper-using-javascript-classes-and-fetch
import axios from "axios";

class ApiFootballData {
  constructor() {
    (this.apiKey = process.env.DOTENV.API_KEY),
      (this.endpoints = {
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
      });
  }

  async request(endpoint = {}) {
    try {
      const response = await fetch(
        `http://api.football-data.org/v2/${endpoint.resource}`,
        {
          method: endpoint?.method,
          headers: { "X-Auth-Token": `${this.apiKey}` },
          body: endpoint?.body ? JSON.stringify(endpoint.body) : null,
        }
      );

      if (!response.ok) {
        throw new Error("Ответ сети был не ok.");
      }
      return await response.json();
      
    } catch (err) {
      // Handle Error Here
      console.error(err);
    }
  }

  teams(method = "", options = {}) {
    const existingEndpoint = this.endpoints.teams[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.request(endpoint);
    }
  }

  competitions(method = "", options = {}) {
    const existingEndpoint = this.endpoints.competitions[method];

    if (existingEndpoint) {
      const endpoint = existingEndpoint(options);
      return this.request(endpoint);
    }
  }
}

export default new ApiFootballData();

// request(){
//   const fetchPromise = fetch('https://jsonplaceholder.typicode.com/posts/1');
//   fetchPromise.then((r)=>r.json()).then((post) => {
//     console.log(post.id); //3
//   });
// }

// request() {
//   axios({
//     method: "get",
//     url: `https://jsonplaceholder.typicode.com/posts/1`,
//   })
//     .then((r) => console.log(r.data));
// }

// request(endpoint = {}) {
//   return fetch(
//     `http://api.football-data.org/v2/${endpoint.resource}`,
//     {
//       method: endpoint?.method,
//       headers: { "X-Auth-Token": `${this.apiKey}` },
//       body: endpoint?.body ? JSON.stringify(endpoint.body) : null,
//     }
//   ).then(async (response) => {
//     const data = await response.json();
//     console.log(data);
//     return data;
//   }).catch((error) => {
//     return error;
//   });
// }
