const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");


const listingSchema = new Schema({
    title :{
        type :String,
        required :true,
    },
    description:String,
    image:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN84egwGKLmhMUXyg-2LlA-hyf5jniFITJhC4cM1RpogjaW6n0oA&s=10&ec=72940544",
        set:(v)=> v==="" ?"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN84egwGKLmhMUXyg-2LlA-hyf5jniFITJhC4cM1RpogjaW6n0oA&s=10&ec=72940544" :v,
    },
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review", 
      }
    ]
});
listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
 await Review.deleteMany({_id:{$in:listing.reviews}});
  }
 
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports=Listing;