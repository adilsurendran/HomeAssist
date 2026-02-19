import UserModel from "../Models/UserModel.js";
import RentalBookingModel from "../Models/shops/RentalBookingModel.js"
import RentalModel from "../Models/shops/shopRentals.js";
import WorkerBookingModel from "../Models/workers/workerBookingModel.js";
import WorkerFeedback from "../Models/workers/WorkerFeedback.js";
import WorkerComplaintModel from "../Models/workers/WorkerComplaintModel.js";
import ShopComplaintModel from "../Models/shops/ShopComplaintModel.js";
import ShopFeedback from "../Models/shops/ShopFeedback.js";
import WorkerModel from "../Models/workers/workerModel.js";



export const bookRental= async (req,res) =>{
    try {
        console.log(req.body,'oo');
        
        const {work_address,
            rent_amount,start_date,rent_length,
            end_date,shop_id,user_id,rental_id,lat,lng}=req.body;

        const test= await UserModel.findById(user_id)
        

 
        const rental= new RentalBookingModel({
            user_id,
            rental_id,
            shop_id,
            rent_amount,
            rent_duration:rent_length,
            work_address,
            status:"rented",
            payment:"completed",
            start_date,
            end_date,
             location:{
                lat,
                lng
            }
        })
        await rental.save()
        

        res.status(200).json({message:"worker booked successfully"})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error booking worker"})
    }
}

export const userRentalBookings = async (req,res) => {
try {
    const uid= req.params.id
    const bookings= await RentalBookingModel.find({user_id:uid}).populate("shop_id").populate("rental_id").populate("user_id")
    // console.log(bookings);
    res.status(200).json({mybookings:bookings})    
} catch (error) {
    console.log(error);
    res.status(500).json({message:"error getting booking data"})   
}
} 

export const checkRentalSlot= async (req,res) => {
    const rid= req.params.id
     try {
        const slots= await RentalBookingModel.find({rental_id:rid})
        console.log(slots);
        
        res.status(200).json({myslot:slots})
     } catch (error) {
        console.log(error);
        
     }
}

export const getUser =async (req,res)=>{
    try {
    const userid= req.params.id
    const user = await UserModel.findById(userid)
    res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message:error})
        console.log(error);   
    }
}
export const displayWorker = async (req,res) =>{
try {
   const workers= await WorkerModel.find().populate("login_id")
   res.status(200).json({workers}) 
} catch (error) {
    res.status(500).json({message: error})
}
}
export const checkWorkerSlot= async (req,res) => {
    const rid= req.params.id
     try {
        const slots= await WorkerBookingModel.find({worker_id:rid ,status:{ $nin: ["pending", "rejected"] }})
        console.log(slots);
        
        res.status(200).json({myslot:slots})
     } catch (error) {
        console.log(error);
        
     }
}
// export const bookWorker= async (req,res) =>{
//     try {
//         const {work_address,user_id,worker_id,
//             work_description,start_date,end_date
//         }=req.body;
//         console.log(req.body,);
        
//         const worker= new WorkerBookingModel({
//             user_id,
//             worker_id,
//             work_address,
//             work_description,
//             start_date,
//             end_date,
//             status:"pending"
//         })
//         await worker.save()
//         res.status(200).json({message:"worker booked successfully"})
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:"error booking worker"})
//     }
// }

export const bookWorker = async (req,res) =>{
    try {

        const {
            work_address,
            user_id,
            worker_id,
            work_description,
            start_date,
            end_date,
            lat,
            lng
        } = req.body;

        console.log(req.body);

        const worker = new WorkerBookingModel({
            user_id,
            worker_id,
            work_address,
            work_description,
            start_date,
            end_date,
            status:"pending",

            // ✅ LOCATION OBJECT
            location:{
                lat,
                lng
            }
        });

        await worker.save();

        res.status(200).json({message:"worker booked successfully"});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"error booking worker"});
    }
};


export const userWorkerBookings = async (req,res) => {
// await RentalBookingModel.updateMany(
//   {
//     status: "rented",
//     end_date: { $lt: new Date() }
//   },
//   { $set: { status: "returned" } }
// );
try {
    const uid= req.params.id
    const bookings= await WorkerBookingModel.find({user_id:uid}).populate("worker_id")
    console.log(bookings);
    res.status(200).json({mybookings:bookings})    
} catch (error) {
    console.log(error);
    res.status(500).json({message:"error getting booking data"})   
}
} 

export const approveworkcompleted= async (req,res) => {
    try {
        const bid= req.params.id
        await WorkerBookingModel.findByIdAndUpdate(bid,{status:"completed"})  
         res.status(200).json({message:"status updated"}) 
    } catch (error) {
         console.log(error);
        res.status(500).json({message:error})       
    }
}

// export const workerFeedbackandRating = async (req,res) => {
// try {
//     console.log(req.body,'feedf');
    
//     const {feedback,rating,worker_id,user_id} = req.body
//     const feed= new WorkerFeedback({
//         feedback,rating,worker_id,user_id
//     })
//     await feed.save()
//     res.status(200).json({message:"feedback recorder"})
// } catch (error) {
//     console.log(error);
//     res.status(500).json({message:error})  
// }
// }

export const workerFeedbackandRating = async (req, res) => {
  try {
    console.log(req.body, 'feedf');

    const { feedback, rating, worker_id, user_id } = req.body;

    // 1️⃣ Save feedback
    const feed = new WorkerFeedback({
      feedback,
      rating,
      worker_id,
      user_id
    });

    await feed.save();

    // 2️⃣ Calculate new average rating
    const allRatings = await WorkerFeedback.find({ worker_id });

    const total = allRatings.reduce((sum, item) => sum + item.rating, 0);

    const average = total / allRatings.length;

    // 3️⃣ Update Worker model
    await WorkerModel.findByIdAndUpdate(worker_id, {
      averageRating: average.toFixed(1),
      totalRatings: allRatings.length
    });

    res.status(200).json({
      message: "Feedback recorded successfully",
      averageRating: average.toFixed(1)
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
export const workerComplaint = async (req,res) => {
try {
    const {user_id,worker_id,complaint} = req.body
    const issue = new WorkerComplaintModel({
        worker_id,user_id,complaint,status:"pending"
    })
    await issue.save()
    res.status(200).json({message:"Complaint registered Successfully"})
    
} catch (error) {
     console.log(error);
    res.status(500).json({message:error})   
}
}

export const getWorkerComplaints = async (req,res) =>{
try {
 const uid= req.params.id
 const issue= await WorkerComplaintModel.find({user_id:uid}).populate("worker_id")
 res.status(200).json({complaint:issue})   
} catch (error) {
res.status(500).json({message:error})  
}
}

export const getShopComplaints = async (req,res) =>{
try {
 const uid= req.params.id
 const issue= await ShopComplaintModel.find({user_id:uid}).populate("shop_id")
 res.status(200).json({complaint:issue})   
} catch (error) {
res.status(500).json({message:error})  
}
}

// export const shopFeedbackandRating = async (req,res) => {
// try {
//     const {feedback,rating,shop_id,user_id,rental_id} = req.body
//     const feed= new ShopFeedback({
//         feedback,rating,shop_id,user_id,rental_id
//     })
//     await feed.save()
//     res.status(200).json({message:"feedback recorded"})
// } catch (error) {
//     console.log(error);
//     res.status(500).json({message:error})  
// }
// }
// export const shopFeedbackandRating = async (req, res) => {
//   try {
//     const { feedback, rating, shop_id, user_id, rental_id } = req.body;
// console.log(req.body);

//     // 1️⃣ Save feedback
//     const feed = new ShopFeedback({
//       feedback,
//       rating,
//       shop_id,
//       user_id,
//       rental_id,
//     });
//     await feed.save();

//     // 2️⃣ Find rental/product
//     const rental = await RentalModel.findById(rental_id);
//     if (!rental) {
//       return res.status(404).json({ message: "Rental not found" });
//     }

//     // 3️⃣ Calculate new average rating
//     const totalRating =
//       rental.averageRating * rental.ratingCount + rating;

//     rental.ratingCount += 1;
//     rental.averageRating = (
//       totalRating / rental.ratingCount
//     ).toFixed(1); // keep 1 decimal

//     // 4️⃣ Save updated rental
//     await rental.save();

//     res.status(200).json({
//       message: "Feedback recorded & rating updated",
//       averageRating: rental.averageRating,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };
export const shopFeedbackandRating = async (req, res) => {
  try {
    const { feedback, rating, shop_id, user_id, booking_id } = req.body;

    const booking = await RentalBookingModel.findById(booking_id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const product_id = booking.rental_id;

    // const alreadyRated = await ShopFeedback.findOne({
    //   rental_id: product_id,
    //   user_id,
    // });

    // if (alreadyRated) {
    //   return res.status(400).json({ message: "Already rated" });
    // }

    const safeRating = Math.min(5, Math.max(1, Number(rating)));

    await ShopFeedback.create({
      feedback,
      rating: safeRating,
      shop_id,
      user_id,
      rental_id: product_id,
    });

    const rental = await RentalModel.findById(product_id);

    const totalRating =
      rental.averageRating * rental.ratingCount + safeRating;

    rental.ratingCount += 1;
    rental.averageRating = Number(
      (totalRating / rental.ratingCount).toFixed(1)
    );

    await rental.save();

    res.json({
      message: "Feedback saved",
      averageRating: rental.averageRating, // 👈 always ≤ 5
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const registerShopComplaint = async (req,res) => {
try {
    const {user_id,shop_id,complaint} = req.body
    const issue = new ShopComplaintModel({
        shop_id,user_id,complaint,status:"pending"
    })
    await issue.save()
    res.status(200).json({message:"Complaint registered Successfully"})
    
} catch (error) {
     console.log(error);
    res.status(500).json({message:error})   
}
}


