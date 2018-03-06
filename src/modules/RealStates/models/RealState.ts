import * as mongoose from "mongoose";

const realStateSchema = new mongoose.Schema({
    address: { type: String, required: true },
    price: { type: Number, required: true },
},
{
    toJSON: {
        transform(doc: any, ret: any) {
            delete ret._id;
        },
        versionKey: false,
        virtuals: true,
    },
});

const RealState = mongoose.model("RealState", realStateSchema);
export default RealState;
