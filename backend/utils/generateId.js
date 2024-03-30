// random id creation
function generateIds() {
    const digits = "0123456789";
    let id = "";
  
    for (let i = 0; i < 6; i++) {
      id += digits[Math.floor(Math.random() * 10)];
    }
    return id;
  }

  export default generateIds;