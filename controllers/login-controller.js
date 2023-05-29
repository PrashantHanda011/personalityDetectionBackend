import jwt from "jsonwebtoken";
import LoginSchema from "../model/LoginSchema.js";
import Login from "../model/LoginSchema.js";

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await Login.findOne({ email });
    if (!!userExist) {
      if (userExist?.password == password) {
        return res.status(200).json({ message: "login SuccessFull" })
      } else {
        return res.status(201).json({ message: "Password is incorrect" })
      }
    } else {
      return res.status(201).json({ message: "User Doesn't exist" })
    }

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const SignUp = async (req, res) => {
  try {
    const { email, password } = req.body;
    const UserExist = await Login.find({ email })
    if (UserExist?.length == 0) {
      const userObj = new LoginSchema({
        email, password
      })
      await userObj.save()
      return res.status(200).json({ message: "user post" })
    }
    return res.status(201).json({ message: "user Exist" })

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export { login, SignUp };
