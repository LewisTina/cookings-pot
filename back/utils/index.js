exports.generateUsername = (firstName, lastName) => {
    const cleanedFirstName = firstName.replace(/\s+/g, '');
    const cleanedLastName = lastName.replace(/\s+/g, '');

    const randomNumber = Math.floor(Math.random() * 900) + 100;

    const username = `${cleanedFirstName}${cleanedLastName}${randomNumber}`;

    return username;
}

exports.hashPassword = async (password) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      return hashedPassword;
    } catch (error) {
      throw new Error('Password hashing failed');
    }
}