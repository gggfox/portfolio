import { User as AppUser } from "../Users/User.entity"; // Adjust the path to your User entity

declare global {
  namespace Express {
    interface User extends AppUser {}

    interface Request {
      user?: Express.User; // To handle req.user
    }
  }

  namespace Express {
    interface Session {
      passport?: {
        user?: string; // user ID or object
      };
    }
  }
}

export {}; // Important to ensure this is a module
