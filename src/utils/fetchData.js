export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd61ab9a58amsh2d2a58e2d8127e7p1c0080jsn9f9755dad233',
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
  }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'd61ab9a58amsh2d2a58e2d8127e7p1c0080jsn9f9755dad233',
    'X-RapidAPI-Host': 'youtube-search-and-download1.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};


