const OneTimePasswordGenerator = async () => {
    const chars = 'qwertyuiopasdfghjklzxcvbnm'; 
    let otpBlock = ''; 

    for (let blocks = 0; blocks <= 2; blocks++) {
        for (let block = 0; block <= 5; block++) {
            const randomNumber = Math.floor(Math.random() * chars.length); 
            const singleChar = chars[randomNumber];
            otpBlock += singleChar; 
        }
        otpBlock += ' '; // Add space after each block
    }

    return otpBlock.trim() // Remove trailing space if necessary
}

export default OneTimePasswordGenerator;