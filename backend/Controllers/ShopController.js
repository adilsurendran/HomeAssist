import ShopModel from "../Models/shops/shopModel.js";
import RentalBookingModel from "../Models/shops/RentalBookingModel.js";
import RentalModel from "../Models/shops/shopRentals.js";



export const getShop =async (req,res)=>{
    try {
    const shopid= req.params.id
    const shop = await ShopModel.findById(shopid)
    res.status(200).json(shop)
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error);   
    }
}

export const addRentals= async (req,res)=> {
    const {id,name,price,stock,category,description} = req.body
    const imagefile=req.file
    const test=await ShopModel.findById(id).populate("login_id")
    const mystatus= test.login_id.status
    try {
  const rental= new RentalModel({
    name,
    price,
    stock,
    category,
    description,
    image:imagefile.filename,
    availability:"available",
    shopid:id,
    verified:mystatus
  })  
  await rental.save()  
  res.status(200).json({message:"Product Added Successfully"}) 
    } catch (error) {
        res.status(500).json({message:error})
    }
}

export const getRentals =async (req,res)=>{
    try {
    const shopid= req.params.id
    const rentals = await RentalModel.find({shopid:shopid})
    res.status(200).json({rentals})
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error);   
    }
}

export const getUserRentals= async (req,res) => {
try {
    const rentals= await RentalModel.find().populate("shopid")
    res.status(200).json({rentals}) 
} catch (error) {
  console.log(error);
  res.status(500).json({message:error})
  
}
}

export const shoprentalbooking  = async (req,res) => {
try {
    const sid= req.params.id
    const bookings= await RentalBookingModel.find({shop_id:sid}).populate("user_id").populate("rental_id")
    console.log(bookings);
    res.status(200).json({mybookings:bookings})    
} catch (error) {

    console.log(error);
    res.status(500).json({message:"error getting booking data"})
    
}
} 

export const fetchProduct= async (req,res) => {
    try {
     const pid= req.params.id 
     console.log(pid);
     
     const product= await RentalModel.findById(pid)
     console.log(product);
     
     res.status(200).json(product)
    } catch (error) {
      console.log(error);
        
    }
}

export const updateProduct = async (req,res)=>{
  try {
   const { name, price, category, description,id } = req.body;
   if(req.file){
  const imageFile = req.file; 
  await RentalModel.findByIdAndUpdate(id,{
    name:name,
    price:price,
    category:category,
    description:description,
    image: imageFile.filename
  });
  res.status(200).json({ message: "Product updated successfully" });
   }
else{

  await RentalModel.findByIdAndUpdate(id,{
    name:name,
    price:price,
    category:category,
    description:description
    
  });

  res.status(200).json({ message: "Product updated successfully" });
   
}   

  } catch (error) {
    res.status(500).json({message:error})
  }
}

export const deleteProduct = async (req,res)=>{
  try {
  const pid= req.params.id
  console.log(pid);
  
  await RentalModel.findByIdAndDelete(pid)
  await RentalBookingModel.deleteMany({rental_id:pid})
  res.status(200).json({message:"product deleted succesfully"});
  } catch (error) {
    res.status(500).json({message:error})
    console.log(error);
    
  }
}


export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await RentalBookingModel.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "returned") {
      return res.status(400).json({ message: "Already returned" });
    }

    // ✅ Update booking status
    booking.status = "returned";
    await booking.save();

    // ✅ Increase rental stock
    await RentalModel.findByIdAndUpdate(
      booking.rental_id,
      { $inc: { stock: 1 } }
    );

    res.status(200).json({ message: "Booking marked as returned" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating status" });
  }
};
