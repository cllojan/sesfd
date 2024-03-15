import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
        minLength: [3, "Fullname must be at leastes 2 characters "],
        maxLength: [50, "Fullname must be ast most 50 characters"]
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "El correo no es valido"
        ]
    },
    password: {
        type: String,
        required: [true, "Contrasena es requerido"],
        select: false,
    },
    perfil_image:String,
    history_order:Object


}, {
    timestamps: true,
})
export const User = models?.User || model('User', UserSchema);
