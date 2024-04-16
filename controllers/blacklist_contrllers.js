const black_list = new Set();

const add_to_black_list = async(token) => {
    black_list.add(token);
  }

module.exports = {black_list ,add_to_black_list} 