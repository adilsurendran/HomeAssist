import LoginModel from '../Models/LoginModel.js'
import UserModel from '../Models/UserModel.js'
import ShopModel from '../Models/shops/shopModel.js';
import bcrypt from 'bcrypt'
import WorkerModel from '../Models/workers/workerModel.js';


export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    console.log(req.body);
    
    const image = req.file;
    const role = "user";

    const existingUser = await LoginModel.findOne({ mail: email });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const logindata = new LoginModel({
      mail: email,
      password: hashedpass,
      role,
      status: "approved",
    });
    await logindata.save();

    const userdata = new UserModel({
      name,
      mail: email,
      address,
      number: phone,
      image: image ? image.filename : null,
      login_id: logindata._id,
    });
    await userdata.save();

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
};


export const registerShop = async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;
    console.log(req.body);
    
    const image = req.file;
    const role = "shop";

    const existingUser = await LoginModel.findOne({ mail: email });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const logindata = new LoginModel({
      mail: email,
      password: hashedpass,
      role,
      status: "pending",
    });
    await logindata.save();

    const shopdata = new ShopModel({
      name:name,
      mail: email,
      address:address,
      number: phone,
      image: image ? image.filename : null,
      login_id: logindata._id,
    });
    await shopdata.save();

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
};

export const registerWorker = async (req, res) => {
  try {
    const { name, email, phone, address, password ,fee, workingdays ,workinghours ,expertise,category  } = req.body;
    console.log(req.body);
    
    const image = req.file;
    const role = "worker";

    const existingUser = await LoginModel.findOne({ mail: email });
    if (existingUser) {
      return res.status(409).json({ message: "Account already exists" });
    }

    const hashedpass = await bcrypt.hash(password, 10);

    const logindata = new LoginModel({
      mail: email,
      password: hashedpass,
      role,
      status: "pending",
    });
    await logindata.save();

    const categoryArray = category
  ? category.split(",").map(item => item.trim())
  : [];

    const workerdata = new WorkerModel({
      name:name,
      mail: email,
      address:address,
      fee,
      expertise,
      workingdays,
      workinghours,
      category:categoryArray,
      number: phone,
      image: image ? image.filename : null,
      login_id: logindata._id,
    });
    await workerdata.save();

    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving data" });
  }
};


export const checklogin = async (req, res) => {
  console.log(req.body);
  
  const { mail, password } = req.body;

  try {
    const check = await LoginModel.findOne({ mail });
    if (!check) {
      return res.status(409).json({ message: "Email not found" });
    }

    const isMatch = await bcrypt.compare(password, check.password);
    if (!isMatch) {
      return res.status(409).json({ message: "Wrong password" });
    }

    if (check.status != "approved") {
      return res.status(403).json({ message: "You are Not approved by the Admin" });
    }
    

   
    if (check.role === "admin") {
      return res.status(200).json({
        _id: check._id,
        role: "admin",
      });
    }

  
    if (check.role === "user") {
      const user = await UserModel.findOne({ login_id: check._id });
      return res.status(200).json({
        _id: user._id,
        role: "user",
      });
    }

  
    if (check.role === "worker") {
      const worker = await WorkerModel.findOne({ login_id: check._id });
      return res.status(200).json({
        _id: worker._id,
        role: "worker",
      });
    }

    if (check.role === "shop") {
      const shop = await ShopModel.findOne({ login_id: check._id });
      return res.status(200).json({
        _id: shop._id,
        role: "shop",
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Login error" });
  }
};

