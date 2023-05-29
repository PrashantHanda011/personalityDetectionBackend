import axios from "axios";
import User from "../model/UserSchema.js";
import { Configuration, OpenAIApi } from 'openai'
// Return a list of all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Return a single user by ID
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new user
export const register = async (req, res, next) => {
  const { name, email, age, gender, profession, character, media, question, movie } = req.body
  try {

    const user = new User({
      name,
      email,
      age,
      gender,
      profession,
      character,
      media,
      questions: question,
      feedback: {
        reason: "",
        feedbackStatus: false
      },
      result: {
        gptResult: "",
        openness: "",
        conscientiousness: "",
        extraversion: "",
        agreeableness: "",
        neuroticism: "",
      }
    });
    const Exist = await User.findOne({ email: email });
    if (!!Exist) {
      return res.status(501).json({ message: "user already exist!" })
    }
    let objectiveArray = question.slice(0, 5)
    let objective = objectiveArray?.map((item, index) => `Q${index + 1} . ${item?.question} Answer - ${item?.answer} ,`)
    objective = objective.join(" ")
    let subQuestion = question?.slice(5, 7)
    let subjective = subQuestion?.map((item, index) => `Q${index + 1} . ${item?.question} Answer - ${item?.answer} ,`)
    subjective = subjective.join(" ")
    let ImageQuestion = question?.slice(7, 8)
    const payload = {
      question: `provide a brief summary about the personality trait of the ${name}  which signifies user's 3 personality out of big 5 traits(openness,conscientiousness,extraversion,agreeableness,neuroticism) use this survey questions answered by the user ,also give some fun facts about the personality and provide some suggestion for choosing a career according to personality , Survey questions - Objective type Question -  ${objective}  ,  Subjective type questions - ${subjective} , and Q7. write some thoughts on the image having crowd in it. Answer - ${ImageQuestion[0]?.answer}  , also use this character -${character} from movie -${movie} which is seleted by the ${name} out of five character for identification of personality out of 5 big traits , also use the age- ${age} yrs and profession - ${profession} for accurate identification  `
    }
    // const data = ChatGptResponse()
    // const data = await axios.post('https://chatgpt3-oav0.onrender.com/chat', payload)
    // console.log("🚀 ~ file: user-controller.js:68 ~ register ~ payload:", payload)

    let newData = {
      // message: data?.data?.text,
      message: "data",
      data: user
    }
    await user.save()

    return res.status(200).json(newData)
  } catch (err) {
    return console.log(err);
  }

};

export const updateFeedback = async (req, res, next) => {
  let user;
  try {

    user = await User.findById(req.params.id);
    console.log(user)
    user.feedback.feedbackStatus = req.body.feedbackStatus
    user.feedback.reason = req.body.reason
    await user.save()
    res.status(200).json({ message: "updated" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


export const ChatGptResponse = async (req, res) => {
  try {
    // const { question } = req.body

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo-0301",
      prompt: "hello",
    });
    console.log(completion.data.choices[0].text)
    return completion.data.choices[0].text
  } catch (error) {
    console.log(error)
  }
}
// Update a user by ID
export const updateUserById = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "User not found" });
    }

    if (req.body.name != null) {
      user.name = req.body.name;
    }
    if (req.body.age != null) {
      user.age = req.body.age;
    }
    if (req.body.gender != null) {
      user.gender = req.body.gender;
    }
    if (req.body.email != null) {
      user.email = req.body.email;
    }
    if (req.body.profession != null) {
      user.profession = req.body.profession;
    }
    if (req.body.character != null) {
      user.character = req.body.character;
    }
    if (req.body.questions != null) {
      user.questions = req.body.questions;
    }
    if (req.body.media != null) {
      user.media = req.body.media;
    }

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
