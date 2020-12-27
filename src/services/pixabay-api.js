const API_KEY = '18969106-b552d166da3dfed7b4523ee16';

function fetchImages(queue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${queue}&page=${page}&key=${API_KEY}&image_type=all&orientation=horizontal&per_page=12`,
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(
      new Error(`Не удалось найти картинки по запросу "${queue}"`),
    );
  });
}

const api = {
  fetchImages,
};

export default api;
