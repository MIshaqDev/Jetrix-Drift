import slugify from "slugify";

// Function to generate a unique slug for a car model
async function generateSlug(name){
    const slug= slugify(name, {
        lower: true,
        strict: true,
    });
    return slug;
}

export default generateSlug;