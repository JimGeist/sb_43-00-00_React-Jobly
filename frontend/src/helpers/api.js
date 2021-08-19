import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get", token = "") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    // this has been provided to show you another way to pass the token. you are only expected to read 
    // this code for this project.
    const url = `${BASE_URL}/${endpoint}`;

    // Handle the headers by including an Authorization header when a token was passed as an argument.
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const headers = (token)
      ? { Authorization: `Bearer ${token}` }
      : {};

    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes



  /** Get details on a company by handle. */
  static async getCompany(handle) {

    /** GET /companies/[handle]  =>  { company }
     *  Company is { handle, name, description, numEmployees, logoUrl, jobs }
     *   where jobs is [{ id, title, salary, equity }, ...]
     * jobs array is always returned, even when there are no jobs.
     * Authorization required: none
     */

    let res = await this.request(`companies/${handle}`);
    return res.company;
  }


  /** Get details for all companies. Need to support filtering by adding filtering to 
   *  query string.
   */
  static async getCompanies(filter) {

    /** GET /companies/  =>
     *   { companies: [ { handle, name, description, numEmployees, logoUrl }, ...] }
     * Can filter on provided search filters:
     * - minEmployees
     * - maxEmployees
     * - nameLike (will find case-insensitive, partial matches)
     * Authorization required: none
    */
    let res = await this.request(`companies${filter}`);

    return res.companies;
  }


  /**
   * signIn() methods authenticates a returning Jobly user. The user object must include
   *  a username and password. 
   * @param {*} user, object with username and password string fields. 
    * @returns JWT "token" which can be used to authenticate further requests.
   */
  static async signIn(user) {
    /** POST /auth/token:  { username, password } => { token }
     * Returns JWT "token" which can be used to authenticate further requests.
     * Authorization required: none
     */

    let res = await this.request(`auth/token`, user, "post");

    return res.token;

  };


  /**
   * signUp() methods adds a new user to Jobly. The user object must include
   *  a username, password, firstName, lastName, and email. 
   * @param {*} user 
    * @returns JWT "token" which can be used to authenticate further requests.
   */
  static async signUp(user) {
    /** POST /auth/register:   { user } => { token }
     * user must include { username, password, firstName, lastName, email }
     * isAdmin defaults to false and is NOT included.
     * Returns JWT "token" which can be used to authenticate further requests.
     * Authorization required: none
     */

    let res = await this.request(`auth/register`, user, "post");

    return res.token;

  };


  /** POST /companies/ { company } =>  { company }
  * company should be { handle, name, description, numEmployees, logoUrl }
  * Returns { handle, name, description, numEmployees, logoUrl }
  * Admin
  */




  /** PATCH /companies/[handle] { fld1, fld2, ... } => { company }
   * Patches company data.
   * fields can be: { name, description, numEmployees, logo_url }
   * Returns { handle, name, description, numEmployees, logo_url }
   * Authorization required: admin
   */




  /** DELETE /companies/[handle]  =>  { deleted: handle }
   * Authorization: admin
   */




  /** POST /jobs/ { job } => { job }
   * job should be { title, salary, equity, companyHandle }
   * Returns { id, title, salary, equity, companyHandle }
   * Authorization required: admin
   */




  /** Get details for all jobs, regardless of company. 
   *  Need to support filtering by adding filtering to query string.
   */
  static async getJobs() {

    /** GET /jobs/ =>
     *   { jobs: [ { id, title, salary, equity, companyHandle, companyName }, ...] }
     * Can provide search filter in query:
     * - minSalary
     * - hasEquity (true returns only jobs with equity > 0, other values ignored)
     * - title (will find case-insensitive, partial matches)
     * Authorization required: none
     */
    let res = await this.request("jobs");

    return res.jobs;
  }


  /** GET /jobs/[jobId] => { job }
   * Returns { id, title, salary, equity, company }
   *   where company is { handle, name, description, numEmployees, logoUrl }
   * Authorization required: none
   */




  /** PATCH /jobs/[jobId]  { fld1, fld2, ... } => { job }
   * Data can include: { title, salary, equity }
   * Returns { id, title, salary, equity, companyHandle }
   * Authorization required: admin
   */




  /** DELETE /jobs/[handle]  =>  { deleted: id }
   * Authorization required: admin
   */




  /** POST /users/ { user }  => { user, token }
   * Adds a new user. This is not the registration endpoint --- instead, this is
   * only for admin users to add new users. The new user being added can be an
   * admin.
   * This returns the newly created user and an authentication token for them:
   *  {user: { username, firstName, lastName, email, isAdmin }, token }
   * Authorization required: admin
   **/




  /** GET /users/ => { users: [ {username, firstName, lastName, email }, ... ] }
   * Returns list of all users.
   * Authorization required: admin
   **/




  /** Get details for the user, including jobs. 
   *  
   */
  static async getUser(user) {

    /** GET /users/[username] => { user }
     * Returns { username, firstName, lastName, isAdmin, applications }
     *   where applications is an array of job ids
     * Authorization required: admin or same user-as-:username
     **/

    let res = await this.request(`users/${user.username}`, {}, "get", user.token);

    return res.user;
  }



  /** PATCH /users/[username] { user } => { user }
   * Data can include:
   *   { firstName, lastName, password, email }
   * Returns { username, firstName, lastName, email, isAdmin }
   * Authorization required: admin or same-user-as-:username
   **/




  /** DELETE /users/[username]  =>  { deleted: username }
   * Authorization required: admin or same-user-as-:username
   **/




  /** Apply for a job. The user object and job id are required arguments.
   *  The user object must include the username and the token.
   *  
   */
  static async applyForJob(user, jobId) {

    /** POST /users/[username]/jobs/[id]  { state } => { application }
     * Returns {"applied": jobId}
     * Authorization required: admin or same-user-as-:username
     * */
    let res = await this.request(`users/${user.username}/jobs/${jobId}`, {}, "post", user.token);

    return res;
  }



}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;