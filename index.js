const API_KEY = "17619649-3f81e35a51e2410035f34f6df";

const pixabayUrl = `https://pixabay.com/api/?key=${API_KEY}&q=yellow+flowers&image_type=photo&pretty=true&per_page=3`;

const getImages = async (pixabayUrl) => {
    const response = await fetch(pixabayUrl);
    const data = await response.json();
    console.log(data);
    // console.log(JSON.parse(response));
    // console.log(response);
}

getImages(pixabayUrl);