
const drySkinProducts = 
[
    { "name": "Avène XeraCalm A.D Lipid-Replenishing Cleansing Oil", "ingredients": ["omega"] },
    { "name": "Vinoclean Makeup Removing Cleansing Oil", "ingredients": ["omega", "almond oil"] },
    { "name": "Seaberry Skin Nutrition Cleansing Oil", "ingredients": ["omega", "polyphenols"] },
    { "name": "Skin Resurfacing Lactic Acid Cleanser", "ingredients": ["lactic acid"] },
    { "name": "Purity Made Simple Cleanser", "ingredients": ["citric acid", "Meadowfoam Seed Oil"] },
    { "name": "Aveeno Oat Cleanser, Calm + Restore, Nourishing - 7.8 fl oz", "ingredients": ["oat"] },
    { "name": "Neutrogena Soothing Clear Calming Turmeric Facial Cleanser - 5.0 fl oz", "ingredients": ["citric acid"] },
    { "name": "Toleriane Hydrating Gentle Face Cleanser", "ingredients": ["coco", "ceramide", "glycerin"] }
];

const oilySkinProducts = 
[
    { "name": "REFRESHER", "ingredients": ["AHA:alphahydroxy acids-ex: lactic-malic-tartaric"] },
    { "name": "MINERAL RADIANCE CLEANSING GEL", "ingredients": ["Jojoba Oil", "Sodium Laureth Sulfate"] },
    { "name": "Bioderma Sebium Foaming Gel 500ml", "ingredients": ["zinc sulfate", "copper sulfate"] },
    { "name": "DermaControl Oil Control Foam Was", "ingredients": ["zinc sulfate"] },
    { "name": "Toleriane Purifying Foaming Face Wash for Oily Skin", "ingredients": ["niacinamide"] }
]


// Get dry skin attribute ingredients
let drySkinIngredients = [];
drySkinProducts.forEach(product => {
    drySkinIngredients = drySkinIngredients.concat(product.ingredients); 
});
let unqiueDrySkinIngredients = new Set(drySkinIngredients);

let drySkinAttrObject = {
    "name": "Dry Skin",
    "ingredients": Array.from(unqiueDrySkinIngredients), // Normally 
}
console.log("Dry skin object:", drySkinAttrObject);

// Get oily skin attribute ingredients
let oilySkinIngredients = [];
oilySkinProducts.forEach(product => {
    oilySkinIngredients = oilySkinIngredients.concat(product.ingredients); 
});
let unqiueOilySkinIngredients = new Set(oilySkinIngredients);
let oilySkinAttrObject = {
    "name": "Oily Skin",
    "ingredients": Array.from(unqiueOilySkinIngredients),
}
console.log("Oily skin object:", oilySkinAttrObject);

// To store these in the database - we will turn them into a string
let oilySkinIngredientsString = Array.from(unqiueOilySkinIngredients).join(",");
// use oilySkinIngredientsString to send to the server/database...

// Upload a new product
let newProduct = {"name": "Andrew Oily Soccer Skin Care Gel", "ingredients": ["caffiene", "niacinamide", "sugar", "zinc sulfate", "omega"]};


// Add a skin attribute label to the product
function getSkinAttribute(submittedIngredients) {
    // (in your app) - fetch all the skin attribute tables, remember to split the string on the comma to get the array back
    // oilySkinIngredients = oilySkinIngredientsString.split(",");
    // here they are just unqiueDrySkinIngredients & unqiueOilySkinIngredients

    // Turn into one big array with all skin attribute tables
    let allAttributesTable = [drySkinAttrObject, oilySkinAttrObject];

    let skinAttrPoints = {};
    submittedIngredients.forEach((ingredient) => {
        console.log('Look for ingriedent:', ingredient);
        allAttributesTable.forEach(skinAttrObj => {
            let skinAttrName = skinAttrObj.name;
            let skinAttrIngredients = skinAttrObj.ingredients;
            console.log('Checking Skin attribute Object:', skinAttrName);
            if (skinAttrIngredients.includes(ingredient)) {
                console.log("Found Match for:", ingredient);
                // If this skinAttrName isn't in the points object yet, add it and set to 1
                if (!skinAttrPoints.hasOwnProperty(skinAttrName)) {
                    skinAttrPoints[skinAttrName] = 1;
                } else {
                    skinAttrPoints[skinAttrName] += 1;
                }
            }
        })
    })
    console.log(skinAttrPoints); // -> { 'Oily Skin': 2, 'Dry Skin': 1 } 

    // It is possible that none of the ingredients in the submitted ingredients lits match ingredients in the existing tables, so return idk
    if (Object.entries(skinAttrPoints).length === 0) {
        return "Dude, IDK how to classify this!";
    }

    // Determine which skin attribute best suits these ingredients
    let bestCount = 0;
    let bestSuitedSkinAttr = "";
    for (let [key, value] of Object.entries(skinAttrPoints)) {
        if (value > bestCount) {
            bestCount = value;
            bestSuitedSkinAttr = key;
        }
    }
    return bestSuitedSkinAttr;

}

let skinAttributeForAndrew = getSkinAttribute(newProduct.ingredients);
console.log("Andrew's recommended skin attribute:",skinAttributeForAndrew);