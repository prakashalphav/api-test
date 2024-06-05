import type {  ApiData  } from "~/services/types";
class CustomError extends Error {
    constructor(  {d, message, type , action, code} : ApiData<any> ) {
      super(message);
      this.name = "CustomError"; // Set the error name
      this.type = type; // Add a custom property
      this.d = d;
      this.action = action;
      this.message = message;
      this.code = code;
    }
  }

  export default CustomError;