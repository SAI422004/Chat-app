import generateTokenAndSetCookie from "../Utils/generateTokens.js";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const Signup = async (req, res) => {
    try{
        const{FullName,username,Password,confirmPassword,Gender} = req.body;

        if(Password !== confirmPassword){
            return res.status(400).json({error:"Passwords don't match"})
        }
        const user = await User.findOne({username});

        if(user) {
            return res.status(400).json({error:"username already exists"})     
        }
        //HASH PASSWORD HERE
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(Password, salt);

        //Profile pic
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        //Data entry for new user
        const newUser = new User ({
            FullName,
            username,
            Password:hashedPassword,
            Gender,
            profilePic: Gender === "male" ? boyProfilePic : girlProfilePic
        })

        //data save on database
        if (newUser) {
        await newUser.save();
        
        res.status(201).json({
            _id: newUser._id,
            FullName: newUser.FullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        })}
        else{
            res.status(400).json({ error: "Invalid user data"});
        }
    } catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export const login = async (req, res) => {
	try {
		const { username, Password } = req.body;
		const user = await User.findOne({ username });
		const isPasswordCorrect = await bcryptjs.compare(Password, user?.Password || "");

		if (!user || !isPasswordCorrect) {
			return res.status(400).json({ error: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);

		res.status(200).json({
			_id: user._id,
			FullName: user.FullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export const logout = (req,res) => {
    console.log("logout");
}