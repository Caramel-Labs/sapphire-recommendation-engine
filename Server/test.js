// Sample JSON array as a string
array = [
  {
    interestName: "amusement parks",
    type: ["Tours and Sightseeing"],
  },
  {
    interestName: "animal encounters",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "archaeological sites",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "architecture photography",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "architecture tours",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "art classes",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "arts and culture",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "ayurvedic spa treatments",
    type: ["Relaxation and Wellness"],
  },
  {
    interestName: "beach visits",
    type: ["Water Activities"],
  },
  {
    interestName: "beachfront dining",
    type: ["Water Activities"],
  },
  {
    interestName: "bird watching",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "boat safaris",
    type: ["Water Activities"],
  },
  {
    interestName: "botanical gardens",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "butterfly watching",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "camping",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "caving",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "city tours",
    type: ["Tours and Sightseeing"],
  },
  {
    interestName: "craft workshops",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "cultural experiences",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "cultural festivals",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "cycling",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "elephant rides",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "fishing",
    type: ["Sports and Recreation"],
  },
  {
    interestName: "golfing",
    type: ["Sports and Recreation"],
  },
  {
    interestName: "hiking",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "historic sites",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "historic walks",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "historical monuments",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "history tours",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "horse shows",
    type: ["Sports and Recreation"],
  },
  {
    interestName: "horseback riding",
    type: ["Sports and Recreation"],
  },
  {
    interestName: "hot air ballooning",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "hot springs",
    type: ["Relaxation and Wellness"],
  },
  {
    interestName: "kayaking",
    type: ["Water Activities"],
  },
  {
    interestName: "landscape photography",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "literary tours",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "local crafts",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "mountain biking",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "museum visits",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "outdoor adventures",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "paddleboarding",
    type: ["Water Activities"],
  },
  {
    interestName: "photography",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "planetarium visits",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "public art installations",
    type: ["Arts and Crafts"],
  },
  {
    interestName: "river cruises",
    type: ["Water Activities"],
  },
  {
    interestName: "rock climbing",
    type: ["Adventure and Outdoor Activities"],
  },
  {
    interestName: "safaris",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "sailing",
    type: ["Water Activities"],
  },
  {
    interestName: "sailing lessons",
    type: ["Water Activities"],
  },
  {
    interestName: "scuba diving",
    type: ["Water Activities"],
  },
  {
    interestName: "sea cruises",
    type: ["Water Activities"],
  },
  {
    interestName: "sightseeing",
    type: ["Tours and Sightseeing"],
  },
  {
    interestName: "snorkeling",
    type: ["Water Activities"],
  },
  {
    interestName: "spiritual retreats",
    type: ["Relaxation and Wellness"],
  },
  {
    interestName: "surfing",
    type: ["Water Activities"],
  },
  {
    interestName: "tea tasting",
    type: ["Tours and Sightseeing"],
  },
  {
    interestName: "temple pilgrimages",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "theater",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "themed parks",
    type: ["Tours and Sightseeing"],
  },
  {
    interestName: "traditional ceremonies",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "turtle watching",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "village homestays",
    type: ["Cultural and Historical Experiences"],
  },
  {
    interestName: "water parks",
    type: ["Water Activities"],
  },
  {
    interestName: "waterfalls",
    type: ["Water Activities"],
  },
  {
    interestName: "whale watching",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "wildlife viewing",
    type: ["Wildlife and Nature"],
  },
  {
    interestName: "yoga retreats",
    type: ["Relaxation and Wellness"],
  },
  {
    interestName: "zip-lining",
    type: ["Adventure and Outdoor Activities"],
  },
];
// Function to remove square brackets from the "type" field
function removeSquareBracketsFromTypes(array) {
  return array.map((item) => {
    if (Array.isArray(item.type) && item.type.length > 0) {
      item.type = item.type[0]; // Assuming there's only one type per object
    }
    return item;
  });
}

// Apply the function
const modifiedArray = removeSquareBracketsFromTypes(array);

// Output the modified array
console.log(JSON.stringify(modifiedArray, null, 4));
console.log(modifiedArray.length);
