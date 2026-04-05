/**
 * fetchModel - Lấy dữ liệu từ server 
 */
function fetchModel(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          return reject(new Error("Lỗi HTTP: " + response.status));
        }
        return response.json();
      })
      .then((data) => {
        // Trả về trực tiếp data để khớp với các component [cite: 79]
        resolve(data); 
      })
      .catch((error) => reject(error));
  });
}

export default fetchModel;