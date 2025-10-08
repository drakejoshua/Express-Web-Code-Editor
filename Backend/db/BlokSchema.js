// import schema dependencies
import mongoose from "mongoose";

// Note: The BlokSchema is designed to store user-created code blocks
// with HTML, CSS, and JavaScript content, along with user-specific settings
// for the code editor. The user_id field links each block to a specific user.

// create blok schema
const BlokSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    html: {
        type: String
    },
    css: {
        type: String
    },
    javascript: {
        type: String
    },
    settings: {
        theme: { type: String, required: true, default: "vs" },
        font_size: { type: Number, default: 16, required: true },
        tab_size: { type: Number, default: 4, required: true },
        auto_complete: { type: Boolean, default: true, required: true },
        editor_layout: { type: String, default: "top", required: true },
    }
})


// export blok model for creation of blok documents
// in the bloks collection on database
export default mongoose.model("bloks", BlokSchema);