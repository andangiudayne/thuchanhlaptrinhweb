/**
 * Lấy dữ liệu từ backend API.
 * @param {string} url 
 * @returns {Promise} 
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    const backendUrl = "https://sk5g76-8081.csb.app/api" + url;

    fetch(backendUrl)
      .then((response) => {
        if (!response.ok) {
          reject(new Error("Lỗi mạng hoặc không tìm thấy dữ liệu"));
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.error("Lỗi khi fetch data:", error);
        reject(error);
      });
  });
}

export default fetchModel;